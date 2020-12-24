require("dotenv").config();
import mongoose from "mongoose";

// mongoose schemas
import student from "../controllers/management/student/student_model";
import session from "../controllers/management/session/session_model";
import inquiry from "../controllers/management/inquiry/inquiry_model";
import staff from "../controllers/management/staff/staff_model";
import product from "../controllers/service/product_model";
import admin from "../controllers/admin/admin_model";
import institution from "../controllers/institution/general/institution_info_model";
import serviceCat from "../controllers/institution/category/service_category_model";
import position from "../controllers/institution/position/position_model";
import room from "../controllers/institution/room/room_model";
import offer from "../controllers/institution/offer/offer_model";
import expenditureTypes from "../controllers/institution/expenditure_type/expenditure_types_model";
import expenditure from "../controllers/accounting/expenditure/expenditure_model";

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.error(err);
  });

// Pass mongoose to all schemas
const Student = student(mongoose);
const Session = session(mongoose);
const Inquiry = inquiry(mongoose);
const Room = room(mongoose);
const Staff = staff(mongoose);
const Offer = offer(mongoose);
const Product = product(mongoose);
const Institution = institution(mongoose);
const Admin = admin(mongoose);
const ServiceCat = serviceCat(mongoose);
const Position = position(mongoose);
const ExpenditureTypes = expenditureTypes(mongoose);
const Expenditure = expenditure(mongoose);

export {
  Student,
  Session,
  Inquiry,
  Room,
  Staff,
  Offer,
  Product,
  Institution,
  Admin,
  ServiceCat,
  Position,
  ExpenditureTypes,
  Expenditure,
};
