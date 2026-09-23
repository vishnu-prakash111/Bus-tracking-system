import mongoose from "mongoose";

const busRouteSchema = new mongoose.Schema(
  {
    routeName: {
      type: String,
      required: true,
      trim: true,
    },

    source: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    stops: [
      {
        stopName: {
          type: String,
          required: true,
          trim: true,
        },

        stopOrder: {
          type: Number,
          required: true,
        },

        latitude: {
          type: Number,
          required: true,
          min: -90,
          max: 90,
        },

        longitude: {
          type: Number,
          required: true,
          min: -180,
          max: 180,
        },

        arrivalTime: {
          type: String,
          match: /^([01]\d|2[0-3]):([0-5]\d)$/,
        },

        departureTime: {
          type: String,
          match: /^([01]\d|2[0-3]):([0-5]\d)$/,
        },
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const BusRoute = mongoose.model("BusRoute", busRouteSchema);

export default BusRoute;