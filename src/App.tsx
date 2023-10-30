import { MainLayout } from "./components/layout/main-layout";
import { DashboardScreen } from "./screens/dashboard/view";

const App = () => {
  return (
    <MainLayout>
      <DashboardScreen />
    </MainLayout>
  );
};

export default App;
