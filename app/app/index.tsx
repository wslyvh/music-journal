import { Join } from "@/components/account/banner";
import { PracticeOverview } from "@/components/practice/overview";
import { ScreenLayout } from "@/components/screen-layout";
import { useAuth } from "@/hooks/useAuth";
import { Text } from "@/components/text";
import { Loading } from "@/components/loading";

export default function Index() {
  const { account, accountLoading, accountError } = useAuth();

  if (accountError) {
    return <Text>Error: {accountError.message}</Text>;
  }

  return (
    <ScreenLayout title="Music Journal">
      {accountLoading ? <Loading /> : account ? <PracticeOverview /> : <Join />}
    </ScreenLayout>
  );
}
