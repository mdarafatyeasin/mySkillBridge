// src/app.ts
import express7 from "express";

// src/modules/reviews/review.route.ts
import express from "express";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Review {\n  id         String       @id @default(uuid())\n  student_id String // it will come from better auth\n  tutor_id   String\n  tutor      TutorProfile @relation(fields: [tutor_id], references: [id])\n  booking_id String\n  rating     Int\n  comment    String\n\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n\n  @@index([rating])\n  @@index([tutor_id])\n}\n\nmodel TutorProfile {\n  id              String  @id @default(uuid())\n  user_id         String  @unique // it will come from better auth\n  user            User    @relation(fields: [user_id], references: [id])\n  hourly_rate     Float?\n  experience_year Int?\n  qualification   String?\n  rating_avg      Float?\n\n  category_id String\n  category    Category @relation(fields: [category_id], references: [id])\n\n  created_at DateTime   @default(now())\n  update_at  DateTime   @updatedAt\n  reviews    Review[]\n  bookings   Booking[]\n  timeSlots  TimeSlot[]\n}\n\nmodel Category {\n  id          String  @id @default(ulid())\n  category    String  @unique\n  description String?\n\n  created_at DateTime @default(now())\n  update_at  DateTime @updatedAt\n\n  tutorProfiles TutorProfile[]\n}\n\nmodel Booking {\n  id         String       @id @default(uuid())\n  tutor_id   String\n  tutor      TutorProfile @relation(fields: [tutor_id], references: [id])\n  student_id String // it will come from better auth\n  user       User         @relation(fields: [student_id], references: [id])\n  time_slot  String       @unique\n  slot       TimeSlot     @relation(fields: [time_slot], references: [id])\n\n  status BookingStatus @default(PENDING)\n}\n\nmodel TimeSlot {\n  id         String       @id @default(uuid())\n  tutor_id   String\n  tutor      TutorProfile @relation(fields: [tutor_id], references: [id])\n  start_time DateTime\n  end_time   DateTime\n  available  Boolean      @default(false)\n\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n  booking    Booking?\n\n  @@index([tutor_id])\n  @@index([id])\n}\n\nmodel User {\n  id            String    @id\n  name          String\n  email         String\n  emailVerified Boolean   @default(true)\n  image         String?\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n  sessions      Session[]\n  accounts      Account[]\n\n  role          String?        @default("USER")\n  bookings      Booking[]\n  tutorProfiles TutorProfile[]\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nenum BookingStatus {\n  COMPLETE\n  CANCELLED\n  PENDING\n  CONFIRMED\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"student_id","kind":"scalar","type":"String"},{"name":"tutor_id","kind":"scalar","type":"String"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"ReviewToTutorProfile"},{"name":"booking_id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"}],"dbName":null},"TutorProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"TutorProfileToUser"},{"name":"hourly_rate","kind":"scalar","type":"Float"},{"name":"experience_year","kind":"scalar","type":"Int"},{"name":"qualification","kind":"scalar","type":"String"},{"name":"rating_avg","kind":"scalar","type":"Float"},{"name":"category_id","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToTutorProfile"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"update_at","kind":"scalar","type":"DateTime"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToTutorProfile"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToTutorProfile"},{"name":"timeSlots","kind":"object","type":"TimeSlot","relationName":"TimeSlotToTutorProfile"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"category","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"update_at","kind":"scalar","type":"DateTime"},{"name":"tutorProfiles","kind":"object","type":"TutorProfile","relationName":"CategoryToTutorProfile"}],"dbName":null},"Booking":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"tutor_id","kind":"scalar","type":"String"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"BookingToTutorProfile"},{"name":"student_id","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"BookingToUser"},{"name":"time_slot","kind":"scalar","type":"String"},{"name":"slot","kind":"object","type":"TimeSlot","relationName":"BookingToTimeSlot"},{"name":"status","kind":"enum","type":"BookingStatus"}],"dbName":null},"TimeSlot":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"tutor_id","kind":"scalar","type":"String"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"TimeSlotToTutorProfile"},{"name":"start_time","kind":"scalar","type":"DateTime"},{"name":"end_time","kind":"scalar","type":"DateTime"},{"name":"available","kind":"scalar","type":"Boolean"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToTimeSlot"}],"dbName":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"role","kind":"scalar","type":"String"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToUser"},{"name":"tutorProfiles","kind":"object","type":"TutorProfile","relationName":"TutorProfileToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
    // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [process.env.APP_URL],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false
  },
  socialProviders: {
    google: {
      enabled: true,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      prompt: "select_account consent",
      accessType: "offline"
    }
  }
});

// src/middleware/auth.ts
var auth2 = (...roles) => {
  return async (req, res, next) => {
    const session = await auth.api.getSession({
      headers: req.headers
    });
    if (!session) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized!"
      });
    }
    if (!session.user.emailVerified) {
      return res.status(403).json({
        success: false,
        message: "Email verification required. Please verify your email!"
      });
    }
    req.user = {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      role: session.user.role,
      emailVerified: session.user.emailVerified
    };
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden! You don't have permission to access this path"
      });
    }
    next();
  };
};

// src/modules/reviews/review.service.ts
var createReview = async (data, user_id) => {
  console.log(data, user_id);
  if (!user_id) {
    throw new Error("user is messing");
  }
  if (!data.booking_id) {
    throw new Error("booking id not found");
  }
  const isBookingExist = await prisma.booking.findUnique({
    where: {
      id: data.booking_id,
      student_id: user_id
    }
  });
  if (!isBookingExist) {
    throw new Error("Booking dose not exist");
  }
  const result = await prisma.review.create({
    data: {
      ...data,
      student_id: user_id
    }
  });
  return result;
};
var reviewService = {
  createReview
};

// src/modules/reviews/review.controller.ts
var createReview2 = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const result = await reviewService.createReview(req.body, user_id);
    res.status(200).json({
      success: true,
      message: "review posted",
      data: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to post review",
      error: err
    });
  }
};
var reviewController = {
  createReview: createReview2
};

// src/modules/reviews/review.route.ts
var router = express.Router();
router.post("/", auth2("USER" /* USER */, "ADMIN" /* ADMIN */, "TEACHER" /* TEACHER */), reviewController.createReview);
var reviewRoute = router;

// src/app.ts
import { toNodeHandler } from "better-auth/node";
import cors from "cors";

// src/modules/timeSlot/slot.route.ts
import express2 from "express";

// src/modules/timeSlot/slot.service.ts
import { error } from "console";
var getTeacherId = async (user_id) => {
  const result = await prisma.tutorProfile.findUnique({
    where: {
      user_id
    }
  });
  return result?.id;
};
var createSlot = async (data, user_id) => {
  const teacherId = await getTeacherId(user_id);
  if (!teacherId) {
    throw error("crate teacher profile");
  }
  const result = await prisma.timeSlot.create({
    data: {
      ...data,
      tutor_id: teacherId,
      available: true
    }
  });
  return result;
};
var slotService = {
  createSlot
};

// src/modules/timeSlot/slot.controller.ts
var createSlot2 = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const result = await slotService.createSlot(req.body, user_id);
    res.status(200).json({
      success: true,
      message: "New slot added",
      data: result
    });
  } catch (err) {
    res.status(500).json({
      message: "failed to create slot",
      error: err
    });
  }
};
var slotController = {
  createSlot: createSlot2
};

// src/modules/timeSlot/slot.route.ts
var router2 = express2.Router();
router2.post("/", auth2("TEACHER" /* TEACHER */), slotController.createSlot);
var timeSlot = router2;

// src/modules/Category/category.route.ts
import express3 from "express";

// src/modules/Category/category.service.ts
var createCategory = async (payload) => {
  const result = await prisma.category.create({
    data: payload
  });
  return result;
};
var getAllCategory = async () => {
  const result = await prisma.category.findMany();
  return result;
};
var categoryService = {
  createCategory,
  getAllCategory
};

// src/modules/Category/category.controller.ts
var createCategory2 = async (req, res) => {
  try {
    const result = await categoryService.createCategory(req.body);
    res.status(200).json({
      success: true,
      message: "category created",
      result
    });
  } catch (err) {
    res.status(500).json({
      message: "failed to create category",
      error: err
    });
  }
};
var getAllCategory2 = async (req, res) => {
  try {
    const result = await categoryService.getAllCategory();
    res.status(200).json({
      success: true,
      message: "category fetched",
      result
    });
  } catch (err) {
    res.status(500).json({
      message: "failed to fetch category",
      error: err
    });
  }
};
var categoryController = {
  createCategory: createCategory2,
  getAllCategory: getAllCategory2
};

// src/modules/Category/category.route.ts
var router3 = express3.Router();
router3.post("/", auth2("ADMIN" /* ADMIN */), categoryController.createCategory);
router3.get("/", categoryController.getAllCategory);
var categoryRoutes = router3;

// src/modules/Booking/booking.route.ts
import express4 from "express";

// src/modules/Booking/booking.service.ts
var createBooking = async (data, user_id) => {
  const result = await prisma.booking.create({
    data: {
      ...data,
      student_id: user_id
    }
  });
  return result;
};
var getMyBooking = async (userId) => {
  const result = await prisma.booking.findMany({
    where: {
      student_id: userId
    },
    include: {
      slot: true
    }
  });
  return result;
};
var getTeacherBooking = async (userId) => {
  const teacherId = await getTeacherId(userId);
  if (!teacherId) {
    throw new Error("teacher not found");
  }
  const result = await prisma.booking.findMany({
    where: {
      tutor_id: teacherId
    },
    include: {
      slot: true,
      user: true
    }
  });
  return result;
};
var getMyBookingById = async (userId, bookingId) => {
  const result = await prisma.booking.findUnique({
    where: {
      id: bookingId,
      student_id: userId
    },
    include: {
      slot: true
    }
  });
  return result;
};
var updateMyBooking = async (userId, bookingId, bookingStatus) => {
  const isExistBooking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
      student_id: userId
    }
  });
  if (!isExistBooking) {
    throw new Error("booking not exist");
  }
  if (isExistBooking.status === "CONFIRMED") {
    throw new Error("sorry booking is confirmed");
  }
  const result = await prisma.booking.update({
    data: {
      status: bookingStatus
    },
    where: {
      id: bookingId,
      student_id: userId
    }
  });
  return result;
};
var updateTeacherBooking = async (teacherId, bookingId, bookingStatus) => {
  const result = await prisma.booking.update({
    where: {
      id: bookingId
      // tutor_id: teacherId
    },
    data: {
      status: bookingStatus
    }
  });
  return result;
};
var getAllBooking = async () => {
  const result = await prisma.booking.findMany({
    include: {
      tutor: true,
      user: true
    }
  });
  return result;
};
var bookingService = {
  createBooking,
  getMyBooking,
  getMyBookingById,
  updateMyBooking,
  updateTeacherBooking,
  getTeacherBooking,
  getAllBooking
};

// src/modules/Booking/booking.controller.ts
var createBooking2 = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const result = await bookingService.createBooking(req.body, user_id);
    res.status(200).json({
      success: true,
      message: "booking success",
      data: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "booking failed",
      error: err
    });
  }
};
var getTeacherBooking2 = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const result = await bookingService.getTeacherBooking(user_id);
    res.status(200).json({
      success: true,
      message: "my bookings",
      bookings: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "booking not found",
      error: err
    });
  }
};
var getMyBooking2 = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const result = await bookingService.getMyBooking(user_id);
    res.status(200).json({
      success: true,
      message: "my bookings",
      bookings: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "booking not found",
      error: err
    });
  }
};
var getMyBookingById2 = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const booking_id = req.params.id;
    const result = await bookingService.getMyBookingById(user_id, booking_id);
    res.status(200).json({
      success: true,
      message: "my booking",
      bookings: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "booking not found",
      error: err
    });
  }
};
var updateMyBooking2 = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const booking_id = req.params.id;
    const { status } = req.body;
    const result = await bookingService.updateMyBooking(user_id, booking_id, status);
    res.status(200).json({
      success: true,
      message: "booking updated",
      bookings: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to update booking",
      error: err
    });
  }
};
var updateTeacherBooking2 = async (req, res) => {
  console.log("hit in update");
  try {
    const user_id = req.user?.id;
    const booking_id = req.params.id;
    const { status } = req.body;
    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "User ID not found in request"
      });
    }
    const teacherId = await getTeacherId(user_id);
    const result = await bookingService.updateTeacherBooking(teacherId, booking_id, status);
    console.log(result);
    res.status(200).json({
      success: true,
      message: "booking updated",
      bookings: result
    });
    console.log(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to update booking",
      error: err
    });
  }
};
var getAllBooking2 = async (req, res) => {
  try {
    const result = await bookingService.getAllBooking();
    res.status(200).json({
      success: true,
      message: "all bookings",
      bookings: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "booking not found",
      error: err
    });
  }
};
var bookingController = {
  createBooking: createBooking2,
  getMyBooking: getMyBooking2,
  getMyBookingById: getMyBookingById2,
  updateMyBooking: updateMyBooking2,
  updateTeacherBooking: updateTeacherBooking2,
  getTeacherBooking: getTeacherBooking2,
  getAllBooking: getAllBooking2
};

// src/modules/Booking/booking.route.ts
var router4 = express4.Router();
router4.post("/", auth2("ADMIN" /* ADMIN */, "TEACHER" /* TEACHER */, "USER" /* USER */), bookingController.createBooking);
router4.get("/", auth2("ADMIN" /* ADMIN */, "TEACHER" /* TEACHER */, "USER" /* USER */), bookingController.getAllBooking);
router4.get("/myBooking", auth2("ADMIN" /* ADMIN */, "TEACHER" /* TEACHER */, "USER" /* USER */), bookingController.getMyBooking);
router4.get("/TeachersBooking", auth2("ADMIN" /* ADMIN */, "TEACHER" /* TEACHER */, "USER" /* USER */), bookingController.getTeacherBooking);
router4.get("/myBooking/:id", auth2("ADMIN" /* ADMIN */, "TEACHER" /* TEACHER */, "USER" /* USER */), bookingController.getMyBookingById);
router4.put("/myBooking/update/:id", auth2("ADMIN" /* ADMIN */, "TEACHER" /* TEACHER */, "USER" /* USER */), bookingController.updateMyBooking);
router4.put("/teachersBooking/update/:id", auth2("ADMIN" /* ADMIN */, "TEACHER" /* TEACHER */, "USER" /* USER */), bookingController.updateTeacherBooking);
var bookingRoutes = router4;

// src/modules/TutorProfile/tutor.route.ts
import express5 from "express";

// src/modules/TutorProfile/tutor.service.ts
var createTutorProfile = async (data, user_id) => {
  const result = await prisma.tutorProfile.create({
    data: {
      ...data,
      user_id
    }
  });
  return result;
};
var getTutorProfile = async (user_id) => {
  const result = await prisma.tutorProfile.findMany({
    where: {
      user_id
    },
    include: {
      bookings: true,
      reviews: true,
      timeSlots: true,
      user: true,
      category: true
    }
  });
  return result;
};
var getAllTutor = async ({ search, sortOrder }) => {
  const whereConditions = {};
  if (search) {
    whereConditions.OR = [
      {
        category: {
          category: {
            contains: search,
            mode: "insensitive"
          }
        }
      },
      {
        category: {
          description: {
            contains: search,
            mode: "insensitive"
          }
        }
      }
    ];
  }
  const allTutor = await prisma.tutorProfile.findMany({
    include: {
      category: true,
      user: true
    },
    orderBy: {
      rating_avg: sortOrder
    },
    where: whereConditions
  });
  return allTutor;
};
var getTutorById = async (tutorId) => {
  const result = await prisma.tutorProfile.findUnique({
    where: {
      id: tutorId
    },
    include: {
      bookings: true,
      reviews: true,
      timeSlots: true,
      user: true,
      category: true
    }
  });
  return result;
};
var tutorService = {
  createTutorProfile,
  getTutorProfile,
  getAllTutor,
  getTutorById
};

// src/modules/TutorProfile/tutor.controller.ts
var createTutorProfile2 = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const result = await tutorService.createTutorProfile(req.body, user_id);
    res.status(200).json({
      success: true,
      message: "teacher profile created successfully",
      data: result
    });
  } catch (err) {
    res.status(500).json({
      message: "failed to create profile",
      error: err
    });
  }
};
var getTutorProfile2 = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const result = await tutorService.getTutorProfile(user_id);
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tutor profile not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "teachers data found",
      data: result
    });
  } catch (err) {
    res.status(500).json({
      message: "Please crate teacher profile",
      error: err
    });
  }
};
var getAllTutor2 = async (req, res) => {
  try {
    const { search } = req.query;
    const searchText = search;
    const sortOrder = req.query.sortOrder;
    const result = await tutorService.getAllTutor({ search: searchText, sortOrder });
    res.status(200).json({
      success: true,
      message: "teachers data found",
      data: result
    });
  } catch (err) {
    res.status(500).json({
      message: "Please crate teacher profile",
      error: err
    });
  }
};
var getTutorById2 = async (req, res) => {
  try {
    const tutorId = req.params;
    const result = await tutorService.getTutorById(tutorId.id);
    res.status(200).json({
      success: true,
      message: "teachers data found",
      data: result
    });
  } catch (err) {
    res.status(500).json({
      message: "Tutor not found",
      error: err
    });
  }
};
var tutorController = {
  createTutorProfile: createTutorProfile2,
  getTutorProfile: getTutorProfile2,
  getAllTutor: getAllTutor2,
  getTutorById: getTutorById2
};

// src/modules/TutorProfile/tutor.route.ts
var router5 = express5.Router();
router5.post("/", auth2("ADMIN" /* ADMIN */, "TEACHER" /* TEACHER */, "USER" /* USER */), tutorController.createTutorProfile);
router5.get("/myProfile", auth2("ADMIN" /* ADMIN */, "TEACHER" /* TEACHER */, "USER" /* USER */), tutorController.getTutorProfile);
router5.get("/", auth2("ADMIN" /* ADMIN */, "TEACHER" /* TEACHER */, "USER" /* USER */), tutorController.getAllTutor);
router5.get("/:id", auth2("ADMIN" /* ADMIN */, "TEACHER" /* TEACHER */, "USER" /* USER */), tutorController.getTutorById);
var tutorRoutes = router5;

// src/modules/User/user.route.ts
import express6 from "express";

// src/modules/User/user.service.ts
var getUserProfile = async (user_id) => {
  const result = await prisma.user.findMany({
    where: {
      id: user_id
    },
    include: {
      // bookings: true,
      bookings: {
        include: {
          slot: true
        }
      }
    }
  });
  return result;
};
var allUser = async () => {
  const result = await prisma.user.findMany();
  return result;
};
var updateUserProfile = async (user_id, data) => {
  const result = await prisma.user.update({
    where: {
      id: user_id
    },
    data
  });
  return result;
};
var userService = {
  getUserProfile,
  allUser,
  updateUserProfile
};

// src/modules/User/user.controller.ts
var getUserProfile2 = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const result = await userService.getUserProfile(user_id);
    res.status(200).json({
      success: true,
      message: "user data found",
      data: result
    });
  } catch (err) {
    res.status(500).json({
      message: "Please Log in to view your profile",
      error: err
    });
  }
};
var allUser2 = async (req, res) => {
  try {
    const result = await userService.allUser();
    res.status(200).json({
      success: true,
      message: "user data found",
      data: result
    });
  } catch (err) {
    res.status(500).json({
      message: "Please Log in to view your profile",
      error: err
    });
  }
};
var updateUserProfile2 = async (req, res) => {
  try {
    const user_id = req.params.id;
    const { role } = req.body;
    const data = role !== void 0 ? { role } : {};
    const result = await userService.updateUserProfile(user_id, data);
    res.status(200).json({
      success: true,
      message: "user profile updated",
      data: result
    });
  } catch (err) {
    res.status(500).json({
      message: "Please Log in to update your profile",
      error: err
    });
  }
};
var userController = {
  getUserProfile: getUserProfile2,
  allUser: allUser2,
  updateUserProfile: updateUserProfile2
};

// src/modules/User/user.route.ts
var router6 = express6.Router();
router6.get("/myProfile", auth2("ADMIN" /* ADMIN */, "TEACHER" /* TEACHER */, "USER" /* USER */), userController.getUserProfile);
router6.get("/allUser", auth2("ADMIN" /* ADMIN */), userController.allUser);
router6.put("/updateProfile/:id", auth2("ADMIN" /* ADMIN */, "TEACHER" /* TEACHER */, "USER" /* USER */), userController.updateUserProfile);
var userRoutes = router6;

// src/app.ts
var app = express7();
app.use(express7.json());
app.use(cors({
  origin: process.env.APP_URL || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}));
app.get("/", (req, res) => {
  res.send("server is running...");
});
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tutor", tutorRoutes);
app.use("/api/v1/slot", timeSlot);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/booking", bookingRoutes);
var app_default = app;

// src/server.ts
var PORT = process.env.PORT || 4e3;
async function main() {
  try {
    await prisma.$connect();
    console.log("bd connected success");
    app_default.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("something went wrong", err);
    prisma.$disconnect();
    process.exit(1);
  }
}
main();
