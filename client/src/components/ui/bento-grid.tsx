import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  date,
  header,
  icon,
  backgroundImage
}: {
  className?: string;
  title?: string | React.ReactNode;
  date?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  backgroundImage?:string;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
      style={{
        backgroundImage: `url(https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(75%)',
      }}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
                
        
        <div className=" font-mono font-bold text-2xl brightness-100 text-white mb-2 mt-2">
          {title}
        </div>
        <div className="font-mono text-white text-lg">
          {date}
        </div>
      </div>
    </div>
  );
};
