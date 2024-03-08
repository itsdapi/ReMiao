export function CatDetailSkeleton() {
  return (
    <div className={"min-h-screen w-full"}>
      <div
        className={
          "animate-pulse flex flex-row  space-x-5 pl-[4.8rem] flex-nowrap"
        }
      >
        <div className={"rounded-2xl w-56 h-[19rem] bg-primary-300 shrink-0"} />
        <div className={"rounded-2xl w-56 h-[19rem] bg-primary-300 shrink-0"} />
      </div>
      <div
        className={
          "flex flex-col justify-center items-center mt-5 mx-10 space-y-5 animate-pulse"
        }
      >
        <div className={"w-20 h-8 bg-primary-600 mb-4"} />
        <div
          className={
            "flex flex-col flex-wrap justify-between align-middle gap-8 w-full"
          }
        >
          <div className={"flex flex-row flex-wrap gap-5 justify-between"}>
            <div className={`flex flex-col space-y-2`}>
              <div className={"h-5 w-8 bg-primary-900"} />
              <div className={"h-4 w-10 bg-primary-600"} />
            </div>
            <div className={`flex flex-col space-y-2`}>
              <div className={"h-5 w-9 bg-primary-900"} />
              <div className={"h-4 w-11 bg-primary-600"} />
            </div>
            <div className={`flex flex-col space-y-2`}>
              <div className={"h-5 w-9 bg-primary-900"} />
              <div className={"h-4 w-7 bg-primary-600"} />
            </div>
          </div>
          <div className={`flex flex-col space-y-2`}>
            <div className={"h-5 w-9 bg-primary-900"} />
            <div className={"h-5 w-1/2 bg-primary-600"} />
          </div>
          <div className={`flex flex-col space-y-2`}>
            <div className={"h-5 w-9 bg-primary-600"} />
            <div className={"h-5 w-8/12 bg-primary-300"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function QRSkeleton() {
  return (
    <div className={"absolute h-full w-4/12 top-0 right-9 flex items-center"}>
      <div
        className={
          "w-full aspect-square animate-pulse bg-primary-300 rounded-2xl"
        }
      ></div>
    </div>
  );
}

export function UserInfoSkeleton() {
  return (
    <>
      <div className={"w-20 h-5 bg-primary-300 mb-3 animate-pulse"} />
      <div className={"w-10 h-5 bg-primary-200 animate-pulse"} />
    </>
  );
}
