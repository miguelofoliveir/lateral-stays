import type { RequestHandler } from "express";

import { validate } from "../../shared/utils/validate.js";
import { staySearchSchema } from "./stays.schemas.js";
import { findStayById, listStays } from "./stays.service.js";

export const getStays: RequestHandler = (request, response) => {
  const searchParams = validate(staySearchSchema, request.query);
  const stays = listStays(searchParams);

  response.status(200).json({
    data: stays
  });
};

export const getStayById: RequestHandler<{ id: string }> = (request, response) => {
  const stay = findStayById(request.params.id);

  if (!stay) {
    response.status(404).json({
      error: {
        message: "Stay not found."
      }
    });

    return;
  }

  response.status(200).json({
    data: stay
  });
};
