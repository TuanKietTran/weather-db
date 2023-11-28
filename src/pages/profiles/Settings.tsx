import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Divider from "~/components/Divider";
import { Appearance, TemperatureUnit, TimeFormat } from "~/utils/constants";

type PreferenceProps = {
  userId: string;
  handleChange: (event: SelectChangeEvent) => void;
  preference: {
    appearance?: string;
    temperatureUnit?: string;
    timeFormat?: string;
  };
};

export default function Settings({
  userId, handleChange, preference
}: PreferenceProps) {
  const session = useSession();
  if (session.status !== "authenticated" || session.data.user.id !== userId) {
    return null;
  }

  return (
    <div>
      <h5>Personalization</h5>
      <Divider />
      <div className="flex justify-between gap-2">
        <div className="flex flex-col">
          <div>Temperature Unit</div>
          <div className="text-sm text-gray-500">
            Adjust how temperature is displayed on your app.
          </div>
        </div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="temperature-unit">Temperature Unit</InputLabel>
          <Select
            labelId="temperature-unit"
            id="temperature-unit"
            value={preference.temperatureUnit}
            name="temperatureUnit"
            onChange={handleChange}
          >
            <MenuItem value={TemperatureUnit.C}>Celsius</MenuItem>
            <MenuItem value={TemperatureUnit.F}>Fahrenheit</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="flex justify-between gap-2">
        <div className="flex flex-col">
          <div>Time format</div>
          <div className="text-sm text-gray-500">
            Adjust how time is displayed on your app.
          </div>
        </div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="time-format">Time format</InputLabel>
          <Select
            labelId="time-format"
            id="time-format"
            value={preference.timeFormat}
            name="timeFormat"
            onChange={handleChange}
          >
            <MenuItem value={TimeFormat.h24}>24h</MenuItem>
            <MenuItem value={TimeFormat.h12}>12h</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="flex justify-between gap-2">
        <div className="flex flex-col">
          <div>Theme</div>
          <div className="text-sm text-gray-500">
            Adjust how your app is displayed.{" "}
          </div>
        </div>
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
          className="self-center"
        >
          <InputLabel id="appearance">Appearance</InputLabel>
          <Select
            labelId="appearance"
            id="appearance"
            value={preference.appearance}
            name="appearance"
            onChange={handleChange}
          >
            <MenuItem value={Appearance.light}>Light</MenuItem>
            <MenuItem value={Appearance.dark}>Dark</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

// export const getStaticPaths: GetStaticPaths = () => {
//   return {
//     paths: [],
//     fallback: "blocking",
//   };
// };

// export async function getStaticProps(
//   context: GetStaticPropsContext<{ id: string }>,
// ) {
//   const id = context.params?.id;

//   if (!id) {
//     return {
//       redirect: {
//         destination: "/",
//       },
//     };
//   }

//   const ssg = ssgHelper();
//   await ssg.settings.getUserSetting.prefetch();

//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       id,
//     },
//   };
// }
