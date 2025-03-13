import Image from "next/image";
import LogoFooter from "public/images/LX.MDILOGO_footer.svg";

const Footer = () => {
  return (
    <footer className="border-t border-t-pub-lightG">
      <div className="max-w-[1680px] m-[0_auto] flex py-[3.75rem] px-[7.5rem] items-start gap-[18.125rem]">
        <Image
          src={LogoFooter}
          width={193}
          height={40}
          style={{ width: "12.063rem", height: "2.5rem" }}
          alt="logo footer"
        />
        <div className="flex flex-col gap-[0.5rem] text-[1rem] font-normal text-pub-gray9">
          본 홈페이지 자료의 저작권은 LX MDI에 귀속되며, 원고의 무단전재, 복제, 배포 등 저작권
          전반에 관한 침해 행위를 금합니다.
          <address className="not-italic">서울특별시 종로구 새문안로 58.</address>
          <p className="font-light">Copyright ⓒ LX MDI Corp. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
