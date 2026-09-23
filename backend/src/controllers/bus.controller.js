import Bus from "../models/bus.model.js";

// Create Bus

const createBus = async (req, res) => {
  try {
    const {
      busNumber,
      busName,
      driver,
      driverNumber,
      route,
      busStops,
    } = req.body;

    // Check all mandatory fields
    if (
      !busName ||
      !busNumber ||
      !driver ||
      !driverNumber ||
      !route
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if bus already exists
    const existingBus = await Bus.findOne({ busNumber });

    if (existingBus) {
      return res.status(409).json({
        success: false,
        message: "Bus already exists",
      });
    }

    // Create bus
    const bus = await Bus.create({
      busName,
      busNumber,
      driver,
      driverNumber,
      route,
      busStops: busStops || [],
    });

    return res.status(201).json({
      success: true,
      message: "Bus created successfully",
      data: bus,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create bus",
      error: error.message,
    });
  }
};


// Get All Buses

const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find()
      .populate(
        "route",
        "routeName source destination"
      );

    return res.status(200).json({
      success: true,
      message: "Buses fetched successfully",
      data: buses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch buses",
      error: error.message,
    });
  }
};


// Get Bus By ID

const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id)
      .populate(
        "route",
        "routeName source destination"
      );

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: bus,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch bus",
      error: error.message,
    });
  }
};


// Update Bus

const updateBus = async (req, res) => {
  try {
    const {
      busName,
      busNumber,
      driver,
      driverNumber,
      route,
      busStops,
      status,
      isActive,
    } = req.body;

    const bus = await Bus.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          busName,
          busNumber,
          driver,
          driverNumber,
          route,
          busStops,
          status,
          isActive,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Bus updated successfully",
      data: bus,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update bus",
      error: error.message,
    });
  }
};


// Delete Bus

const deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(
      req.params.id
    );

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Bus deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete bus",
      error: error.message,
    });
  }
};


export {
  createBus,
  getAllBuses,
  getBusById,
  updateBus,
  deleteBus,
};

