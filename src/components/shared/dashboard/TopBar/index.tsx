import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  src?: any;
  title?: string;
}

const Topbar: FC<Props> = ({ children, src, title }) => {
  return (
    <div
      className="w-full h-[31.25rem] flex flex-col justify-end relative"
      style={{ background: `url(${src}) no-repeat center / cover` }}
    >
      <div className="w-full h-full absolute top-0 left-0 flex items-center">
        <h2 className="max-w-[105rem] w-full m-[0_auto] pl-[10rem] pb-20 text-white text-[2.813rem] font-bold leading-[6.25rem]">
          {title}
        </h2>
      </div>
      <div className="">{children && children}</div>
    </div>
  );
};

export default Topbar;
