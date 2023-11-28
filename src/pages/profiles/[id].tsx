import {
  type GetStaticPaths,
  type GetStaticPropsContext,
  type InferGetStaticPropsType,
  type NextPage,
} from "next";
import Head from "next/head";
import { ssgHelper } from "~/server/api/ssgHelper";
import { api } from "~/utils/api";
import { AppName } from "~/utils/constants";
import ErrorPage from "next/error";
import Link from "next/link";
import { IconHoverEffect } from "~/components/IconHoverEffect";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Settings from "./Settings";

const ProfilePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  id,
}) => {
  const { data: profile } = api.profiles.getById.useQuery({ id });
  const context = api.useContext();
  const toggleChanges = api.profiles.postUserSetting.useMutation({
    onSuccess:  (preference) => {
      context.profiles.getById.setData({ id }, (data) => {
        if (!data) return;

        return {
          ...data,
          preference: {
            ...data.preference,
            ...preference,
          },
        };
      });
      context.profiles.getUserPreference.setData(undefined, (data) => {
        if (!data) return;

        return {
          ...data,
          ...preference,
        };
      });
    },
  });

  if (!profile?.name) return <ErrorPage statusCode={404}></ErrorPage>;

  return (
    <>
      <Head>
        <title>
          {profile.name} | {AppName}
        </title>
      </Head>
      <header className="sticky top-0 z-10 flex items-center border-b  p-2">
        <Link href=".." className="mr-2">
          <IconHoverEffect>
            <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
          </IconHoverEffect>
        </Link>
        <h1 className="text-lg font-bold flex-shrink-0">My Profile</h1>
      </header>
      <main className="flex min-h-screen flex-col p-2 gap-2">
        <Settings
          userId={id}
          preference={profile.preference}
          handleChange={(event) =>
            toggleChanges.mutate({
              ...profile.preference,
              [event.target.name]: event.target.value,
            })
          }
        />
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>,
) {
  const id = context.params?.id;

  if (!id) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const ssg = ssgHelper();
  await ssg.profiles.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
}

export default ProfilePage;
