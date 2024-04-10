import { lazy, FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import { WithChildren } from "../../_metronic/helpers";
import { routeList } from "./RouteList";
import { ProtectedRoute } from "./protectedRoute";
import MainLayout from "../mainLayout/MainLayout";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const ProfilePage = lazy(
    () => import("../pages/merchant/profile/ProfilePage")
  );
  const AccountPage = lazy(() => import("../modules/accounts/AccountPage"));

  const role = localStorage.getItem("role");

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route
          path="/merchant/profile/*"
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        {/* <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        <Route
          path='merchant/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        <Route path='*' element={<Navigate to='/error/404' />} /> */}
        {routeList.map((routeItem: any) => {
          console.log("routeItem", routeItem);
          return (
            <Route
              key={`routeIndex${routeItem?.id}`}
              path={routeItem?.path}
              errorElement={<>Common Error Component</>}
              element={
                <ProtectedRoute
                  accessRoles={routeItem?.accessRoles}
                  redirectPath={routeItem?.redirectPath}
                  isAuthRequired={routeItem?.isAuthRequired}
                >
                  <MainLayout
                    pageTitle={routeItem.name}
                    layoutType={routeItem.layoutType}
                  >
                    {routeItem.element}
                  </MainLayout>
                </ProtectedRoute>
              }
            />
          );
        })}
        <Route
          path="*"
          element={
            role === "C" ? (
              <Navigate to="/customer/dashboard" />
            ) : role === "M" ? (
              <Navigate to="/merchant/dashboard" />
            ) : (
              <Navigate to="/auth/login" />
            )
          }
        />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
