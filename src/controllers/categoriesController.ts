import { getPaginationParams } from "../helpers/getPaginationParams";
import { Category } from "../models";
import { categoryService } from "../services/categoryService";
//TO DO: RESOLVER ESSES ERROS DA QUERY, JSON E PARAMS
//Passo 15 - criando a primeira rota
export const categoriesController = {
  //GET /categories
  index: async (req: Request, res: Response) => {
    // Passo 16 -paginação de categorias
    const [page, perPage] = getPaginationParams(req.query);
    try {
      //Passo 16 - paginação de categorias
      const paginatedCatergories = await categoryService.findAllPaginated(
        page,
        perPage
      );
      return res.json(paginatedCatergories);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },
  //GET /categories/:id
  show: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const category = await categoryService.findByIdWithCourses(id);
      res.json(category);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },
};