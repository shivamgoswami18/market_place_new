import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { privateRoutes, publicRoutes, redirectPath } from "./routesConfig";

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to={redirectPath} replace />} />

      {publicRoutes.map(({ path, element, children }) => (
        <Route key={path} path={path} element={element}>
          {children?.map(({ path: childPath, element: childElement }) => (
            <Route key={`${path}-${childPath}`} path={childPath} element={childElement} />
          ))}
        </Route>
      ))}

      {privateRoutes.map(({ path, element, children }) => (
        <Route key={path} path={path} element={<ProtectedRoute>{element}</ProtectedRoute>}>
          {children?.map(({ path: childPath, element: childElement }) => (
            <Route key={`${path}-${childPath}`} path={childPath} element={childElement} />
          ))}
        </Route>
      ))}
    </Routes>
  );
};

export default AppRoutes;

