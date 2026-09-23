import bcrypt from "bcryptjs";
import Driver from "../models/driver.model.js";

const createDriver = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      licenseNumber,
    } = req.body;

    // Check all mandatory fields.
    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !licenseNumber
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check if driver already exists
    const existingDriver = await Driver.findOne({
      $or: [{ email }, { phone }, { licenseNumber }],
    });

    if (existingDriver) {
      return res.status(409).json({
        success: false,
        message: "Driver already exists",
      });
    }

    // hashed pasword
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // create driver
    const driver = await Driver.create({
      name,
      email,
      password: hashedPassword,
      phone,
      licenseNumber,
    });

    // remove password from response
    const createdDriver = await Driver.findById(
      driver._id
    ).select("-password");

    return res.status(201).json({
      success: true,
      message: "Driver created successfully",
      data: createdDriver,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// get all drivers details

const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find()
      .select("-password")
      .populate(
        "assignedBus",
        "busName busNumber"
      )
      .populate(
        "assignedRoute",
        "routeName source destination"
      );

    return res.status(200).json({
      success: true,
      data: drivers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch drivers",
      error: error.message,
    });
  }
};


// get driver by  id

const getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(
      req.params.id
    )
      .select("-password")
      .populate(
        "assignedBus",
        "busName busNumber"
      )
      .populate(
        "assignedRoute",
        "routeName source destination"
      );

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: driver,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch driver",
      error: error.message,
    });
  }
};


// update drivers

const updateDriver = async (req, res) => {
  try {
    const {
      name,
      phone,
      licenseNumber,
      profileImage,
      status,
      isAvailable,
      assignedBus,
      assignedRoute,
    } = req.body;

    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name,
          phone,
          licenseNumber,
          profileImage,
          status,
          isAvailable,
          assignedBus,
          assignedRoute,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Driver updated successfully",
      data: driver,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update driver",
      error: error.message,
    });
  }
};


// delete driver 

const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(
      req.params.id
    );

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Driver deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete driver",
      error: error.message,
    });
  }
};


export {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
};

