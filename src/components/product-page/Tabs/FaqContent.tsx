import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = {
  question: string;
  answer: string;
};

const faqsData: FaqItem[] = [
  {
    question: "How is product stock and availability updated?",
    answer:
      "All product prices, availability, and stock statuses are synchronized in real time. If an item sells out, it immediately updates to Out of Stock on the storefront and in the AI assistant.",
  },
  {
    question: "What warranty and return policy is included?",
    answer:
      "All electronics purchased from ShopCo Electronics come with a 1-year manufacturer warranty and a 30-day hassle-free replacement or refund guarantee.",
  },
  {
    question: "Are the chargers and cables fast-charge compatible?",
    answer:
      "Yes, our USB-C chargers and adapters support Quick Charge and Power Delivery (PD) protocols for smartphones, tablets, laptops, and gaming accessories.",
  },
  {
    question: "What should I do if an item is out of stock?",
    answer:
      "Our store reflects up-to-date availability in real time. You can ask our ShopCo AI assistant in the bottom-right corner for recommended in-stock alternatives from the same category or restock updates.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can contact our customer support team directly or ask our ShopCo AI assistant in the bottom-right corner for instant help with orders, products, and warranties.",
  },
];

const FaqContent = () => {
  return (
    <section>
      <h3 className="text-xl sm:text-2xl font-bold text-black mb-5 sm:mb-6">
        Frequently asked questions
      </h3>
      <Accordion type="single" collapsible>
        {faqsData.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx + 1}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FaqContent;
