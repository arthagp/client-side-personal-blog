import CardLeft from "@/components/CardLeft";
import CardRight from "@/components/CardRight";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <h1 className="ml-[105px] my-5 font-bold text-xl">Recent Blog Post</h1>
      <div className="flex justify-between px-[105px]">
        <div>
          <CardLeft />
        </div>
        <div>
          <CardRight/>
          <CardRight/>
        </div>
      </div>
      <h1 className="ml-[105px] my-5 font-bold text-xl">All Blog Post</h1>
      <div className="flex justify-between px-[105px]">
        <div>
          <CardLeft />
        </div>
        <div>
          <CardRight/>
          <CardRight/>
        </div>
      </div>
    </>
  );
}
