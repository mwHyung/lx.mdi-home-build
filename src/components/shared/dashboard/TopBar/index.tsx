import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  src?: any;
  title?: string;
}

const Topbar: FC<Props> = ({ children, src, title }) => {
  return (
    <div
      className="w-full h-[65rem] flex flex-col justify-end relative"
      style={{ background: `url(${src}) no-repeat center / cover` }}
    >
      <h2 className="text-white text-[7rem] font-bold leading-[10rem] absolute top-1/2 left-[20%] translate-x-[-44%] translate-y-[-77%]">
        {title}
      </h2>
      <div className="">{children && children}</div>
    </div>
  );
};

export default Topbar;
