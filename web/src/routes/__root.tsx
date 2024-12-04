import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import { Topbar } from "../components/Topbar";
import { Theme, useTheme } from "react-daisyui";
import { Home } from "@/routes/home";
import { Terms } from "@/routes/terms";
import { Privacy } from "@/routes/privacy";
import { Footer } from "@/components/Footer";

function RootLayout() {
  const { theme } = useTheme();
  return (
    <Theme dataTheme={theme}>
      <Topbar />
      <Outlet />
      <Footer />
    </Theme>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy",
  component: Privacy,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: Terms,
});

const routeTree = rootRoute.addChildren([indexRoute, privacyRoute, termsRoute]);

export const router = createRouter({ routeTree });

export const Route = createRootRoute({
  component: () => {
    const { theme } = useTheme();
    return (
      <Theme dataTheme={theme}>
        <Topbar />
        <Outlet />
        <Footer />
      </Theme>
    );
  },
});

// Register router for type-safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
