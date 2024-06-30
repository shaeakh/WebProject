import { HoverEffect } from "@/app/tournament/[tournament]/SCcard-hover-effect";

export default function Teams(props:any) {
  let obj = props.obj;
  return (
    <div className="w-full mx-auto ">
      <HoverEffect items={obj} />
    </div>
  );
}
