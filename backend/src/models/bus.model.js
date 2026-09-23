import mongoose from "mongoose";

// Schema for each bus stand timing entry
const busStandTimeSchema = new mongoose.Schema(
  {
    busStandName: {
      type: String,
      required: true,
      trim: true,
    },

    // Usual arrival time
    usualArrivalTime: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },

    // Usual departure time
    usualDepartureTime: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },

    // Actual arrival time
    arrivalTime: {
      type: Date,
      default: null,
    },

    // Actual departure time
    departureTime: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Bus Schema
const busSchema = new mongoose.Schema(
  {
    // Auto increment bus ID
    busId: {
      type: Number,
      required: true,
      unique: true,
    },

    busName: {
      type: String,
      required: true,
      trim: true,
    },

    busNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    driver: {
      type: String,
      required: true,
      trim: true,
    },

    driverNumber: {
      type: String,
      required: true,
      trim: true,
    },

    route: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "BusRoute",
    },

    // Array of bus stand timings
    busStops: {
      type: [busStandTimeSchema],
      default: [],
    },

    status: {
      type: String,
      enum: ["active", "inactive", "maintenance"],
      default: "inactive",
    },

    // Check whether bus is available
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Get next bus ID
const getNextBusId = async () => {
  const lastBus = await Bus.findOne().sort({ busId: -1 }); // get the bus with highest busId

  return lastBus ? lastBus.busId + 1 : 1; // increment from the last busId, or start from 1
};

// Pre-save hook to assign busId before saving
busSchema.pre("save", async function (next) {
  if (!this.busId) {
    this.busId = await getNextBusId();
  }

  next();
});

// Create model
const Bus = mongoose.model("Bus", busSchema);

export default Bus;