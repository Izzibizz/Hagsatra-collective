// src/Routes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import { HomePage } from "../pages/HomePage";
import { AboutPage } from "../pages/AboutPage";
import { ContactPage } from "../pages/ContactPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { FreeStudios } from "../pages/FreeStudios";
import { Activities } from "../pages/Activities";

const AppRoutes: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/om-oss" element={<AboutPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
        <Route path="/lediga-ateljeer" element={<FreeStudios />} />
        <Route path="/verksamhet" element={<Activities />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
  );
};

export default AppRoutes;
