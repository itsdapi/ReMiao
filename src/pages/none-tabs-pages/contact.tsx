import TopbarProvider from "@/ui/topbar";
import { ContactCard } from "@/ui/cards";
import { PaddingBlock, PaddingBottomS } from "@/ui/padding-block";
import useSWR from "swr";
import { getContactInfo } from "@/lib/miao-api/setting";
import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";
import MySuspense from "@/ui/my-suspense";
import { ContactSkeleton } from "@/ui/skeleton";

export default function Contact() {
  const { data, isLoading } = useSWR("contact", getContactInfo);
  const fileUrl = useSelector((state: RootState) => state.login.data?.fileUrl);
  return (
    <TopbarProvider
      topClassName={"bg-primary-100"}
      className={"bg-primary-100 min-h-screen"}
      observeTargetSelector={"#content"}
      title={"联系方式"}
      back
    >
      <PaddingBlock />
      <div className={"mx-5 space-y-4"} id={"content"}>
        <MySuspense loading={isLoading} fallback={<ContactSkeleton />}>
          {data?.map((contact) => (
            <ContactCard
              key={contact.name}
              name={contact.name}
              wx={contact.wx}
              avatar={`${fileUrl}/${contact.avatarFileName}`}
              email={contact.email}
              tag={contact.tag}
            />
          ))}
        </MySuspense>
      </div>
      <PaddingBottomS />
      <PaddingBottomS />
    </TopbarProvider>
  );
}
