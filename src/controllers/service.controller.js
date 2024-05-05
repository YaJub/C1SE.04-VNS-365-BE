const { Service } = require("../database/sequelize");

const createService = async (req, res, next) => {
  try {
    const { nameService, description, priceService, image } = req.body;

    const newService = await Service.create({
      nameService,
      description,
      priceService,
      image,
    });

    return res.json({
      data: {
        newService,
      },
      message: "Create service success",
    });
  } catch (error) {
    return next(error);
  }
};

const getAllService = async (req, res, next) => {
  try {
    const allService = await Service.findAll({
      order: [["createdAt", "ASC"]],
    });
    return res.json({
      data: {
        allService,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getAllServiceforAdmin = async (req, res, next) => {
  try {
    const { page, perPage } = req.query;

    const offset = (+page - 1) * +perPage;
    const limit = +perPage;

    const allService = await Service.findAndCountAll({
      offset,
      limit,
      order: [["createdAt", "ASC"]],
    });

    const { count } = allService;
    const totalPage = Math.ceil(count / perPage);

    return res.json({
      data: {
        allService: allService.rows,
        totalPage,
        page,
        perPage,
        total: count,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const updateOneService = async (req, res, next) => {
  try {
    const { nameService, description, priceService, image } = req.body;

    const { id } = req.params;
    const updateService = await Service.update(
      {
        nameService,
        description,
        priceService,
        image,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.json({
      data: {
        updateService,
      },
      message: "Update service success",
    });
  } catch (error) {
    return next(error);
  }
};

const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Service.destroy({
      where: {
        id,
      },
    });
    return res.json({
      message: "Delete all service success",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createService,
  updateOneService,
  deleteService,
  getAllService,
  getAllServiceforAdmin,
};
