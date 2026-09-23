import BusRoute from "../models/busRoute.model.js";

// Create Route

const createRoute = async (req, res) => {
  try {
    const {
      routeName,
      source,
      destination,
      stops,
    } = req.body;

    // Check all mandatory fields

    if (!routeName || !source || !destination) {
      return res.status(400).json({
        success: false,
        message:
          "Route name, source and destination are required",
      });
    }

    // Check duplicate route

    const existingRoute = await BusRoute.findOne({
      routeName,
    });

    if (existingRoute) {
      return res.status(409).json({
        success: false,
        message: "Route already exists",
      });
    }

    // Create route

    const route = await BusRoute.create({
      routeName,
      source,
      destination,
      stops: stops || [],
    });

    return res.status(201).json({
      success: true,
      message: "Route created successfully",
      data: route,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create route",
      error: error.message,
    });
  }
};


// Get All Routes

const getAllRoutes = async (req, res) => {
  try {
    const routes = await BusRoute.find();

    return res.status(200).json({
      success: true,
      data: routes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch routes",
      error: error.message,
    });
  }
};


// Get Route By ID

const getRouteById = async (req, res) => {
  try {
    const route = await BusRoute.findById(
      req.params.id
    );

    if (!route) {
      return res.status(404).json({
        success: false,
        message: "Route not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: route,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch route",
      error: error.message,
    });
  }
};


// Update Route

const updateRoute = async (req, res) => {
  try {
    const {
      routeName,
      source,
      destination,
      stops,
    } = req.body;

    const route = await BusRoute.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          routeName,
          source,
          destination,
          stops,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!route) {
      return res.status(404).json({
        success: false,
        message: "Route not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Route updated successfully",
      data: route,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update route",
      error: error.message,
    });
  }
};


// Delete Route

const deleteRoute = async (req, res) => {
  try {
    const route = await BusRoute.findByIdAndDelete(
      req.params.id
    );

    if (!route) {
      return res.status(404).json({
        success: false,
        message: "Route not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Route deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete route",
      error: error.message,
    });
  }
};


export {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
};

