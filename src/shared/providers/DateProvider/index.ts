import { container } from "tsyringe";

import { DateProvider } from "@shared/providers/DateProvider/implementations/DateProvider";
import { IDateProvider } from "@shared/providers/DateProvider/IDateProvider";

container.registerSingleton<IDateProvider>(
  "DateProvider",
  DateProvider
);