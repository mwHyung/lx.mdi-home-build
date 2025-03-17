import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

interface PostPageProps {
  params: { id: string };
}

export default async function Home({ params }: PostPageProps) {
  const id = params;

  try {
    // 동적으로 해당 id의 페이지를 import
    const PageComponent = dynamic(() => import(`../${id}/page`).catch(() => null));

    if (!PageComponent) {
      return notFound();
    }

    return <PageComponent />;
  } catch (error) {
    return notFound();
  }
}
