import { request, response, Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();
//                          Utilizado como um midelleware
categoriesRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCategoryController.handle
);

categoriesRoutes.get("/", listCategoriesController.handle);

// file == nome reconhecido pelo insomnia
categoriesRoutes.post(
    "/import",
    upload.single("file"),
    ensureAuthenticated,
    ensureAdmin,
    importCategoryController.handle
    // Passando para o handle de importCategory o request e response
);

export { categoriesRoutes };
