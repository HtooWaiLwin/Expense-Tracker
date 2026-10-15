import { toTypedSchema } from "@vee-validate/zod";
import { IncomeCategories, ExpenseCategories } from "../types/transaction";
import { z } from "zod";

export const transactionSchema = toTypedSchema(
    z
        .object({
            type: z.enum(["Income", "Expense"], {
                message: "Please select a transaction type.",
            }),

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

            date: z
                .string()
                .min(1, "Date is required.")
                .refine((value) => {
                    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                        return false;
                    }

                    const parsed = new Date(`${value}T12:00:00`);

                    return (
                        !Number.isNaN(parsed.getTime()) &&
                        parsed.getFullYear() === Number(value.slice(0, 4)) &&
                        parsed.getMonth() + 1 === Number(value.slice(5, 7)) &&
                        parsed.getDate() === Number(value.slice(8, 10))
                    );
                }, "Please enter a valid date."),

            category: z.string().min(1, "Please select a category."),

            note: z.string().optional(),
        })
        .superRefine((values, ctx) => {
            const categories: readonly string[] =
                values.type === "Income" ? IncomeCategories : ExpenseCategories;

            if (values.category && !categories.includes(values.category)) {
                ctx.addIssue({
                    code: "custom",
                    path: ["category"],
                    message: "Please select a valid category for this type.",
                });
            }
        }),
);
