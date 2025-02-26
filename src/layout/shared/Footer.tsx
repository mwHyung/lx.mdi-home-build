import Image from "next/image";
import LogoFooter from "public/images/LX.MDILOGO_footer.svg";

const Footer = () => {
  return (
    <footer>
      <div className="flex py-24 px-48 items-start gap-[29rem] border-t border-t-pub-lightG">
        <Image
          src={LogoFooter}
          width={193}
          height={40}
          style={{ width: "19.3rem", height: "4rem" }}
          alt="logo footer"
        />
        <div className="flex flex-col gap-[0.8rem] text-[1.6rem] font-normal text-pub-gray9">
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
