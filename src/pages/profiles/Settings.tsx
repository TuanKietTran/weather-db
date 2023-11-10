import Divider from "~/components/Divider";

export default function Settings() {

  return <div >
    <h5>Personalization</h5>
    <Divider />
    <div className="flex justify-between gap-2" >
      <div className="flex flex-col">
        <div>Temperature Unit</div>
        <div className="text-sm text-gray-500">Adjust how temperature is displayed on your device.</div>
      </div>
    </div>
    <div className="flex justify-between gap-2" >
      <div className="flex flex-col">
        <div>Temperature Unit</div>
        <div className="text-sm text-gray-500">Adjust how temperature is displayed on your device.</div>
      </div>
    </div>
    <div className="flex justify-between gap-2" >
      <div className="flex flex-col">
        <div>Temperature Unit</div>
        <div className="text-sm text-gray-500">Adjust how temperature is displayed on your device.</div>
      </div>
    </div>
    <div className="flex justify-between gap-2" >
      <div className="flex flex-col">
        <div>Temperature Unit</div>
        <div className="text-sm text-gray-500">Adjust how temperature is displayed on your device.</div>
      </div>
    </div>
  </div>
}