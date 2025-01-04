import React from "react";
import { montserrat } from "@/lib/fonts";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { CoinDataById } from "@/lib/schemas";

const About = ({ data }: { data: CoinDataById }) => {
  return (
    <div className="space-y-4 p-4 md:p-16">
      <Accordion type="single" collapsible className="">
        <AccordionItem value="description">
          <AccordionTrigger>About {data.name}</AccordionTrigger>
          <AccordionContent className="overflow-hidden text-sm">
            <div>
              <div
                className={`${montserrat.className} description-content indent-4 md:indent-10 font-sans text-justify text-sm tracking-wide text-gray-600 dark:text-gray-400`}
                dangerouslySetInnerHTML={{ __html: data.description.en }}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="link">
          <AccordionTrigger>Homepage</AccordionTrigger>
          <AccordionContent className="flex flex-col space-y-2">
            {data.links?.homepage.map((link) => (
              <a href={link} target="_blank" className="pl-6 text-blue-500 hover:underline">
                {link}
              </a>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default About;
