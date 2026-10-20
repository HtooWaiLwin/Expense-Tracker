import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const budgetSchema = toTypedSchema(
    z.object({
        amount: z.preprocess(
            (value) =>
                value === "" || value === null || value === undefined
                    ? undefined
                    : Number(value),
            z
                .number({
                    error: "Amount is required.",
                })
                .finite("Enter a valid amount.")
                .positive("Amount must be greater than zero."),
        ),

        category: z.string().min(1, "Please select a category."),
    }),
);
