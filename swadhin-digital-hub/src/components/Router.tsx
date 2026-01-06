import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import ServicesPage from '@/components/pages/ServicesPage';
import SolutionsPage from '@/components/pages/SolutionsPage';
import ProjectsPage from '@/components/pages/ProjectsPage';
import BlogPage from '@/components/pages/BlogPage';
import BlogPostPage from '@/components/pages/BlogPostPage';
import TeamPage from '@/components/pages/TeamPage';
import PricingPage from '@/components/pages/PricingPage';
import FAQPage from '@/components/pages/FAQPage';
import ContactPage from '@/components/pages/ContactPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "services",
        element: <ServicesPage />,
      },
      {
        path: "solutions",
        element: <SolutionsPage />,
      },
      {
        path: "projects",
        element: <ProjectsPage />,
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
      {
        path: "blog/:id",
        element: <BlogPostPage />,
      },
      {
        path: "team",
        element: <TeamPage />,
      },
      {
        path: "pricing",
        element: <PricingPage />,
      },
      {
        path: "faq",
        element: <FAQPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "privacy",
        element: <Navigate to="/" replace />,
      },
      {
        path: "terms",
        element: <Navigate to="/" replace />,
      },
      {
        path: "cookies",
        element: <Navigate to="/" replace />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
