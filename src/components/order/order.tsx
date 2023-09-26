"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import React, { RefObject, useRef, useState } from "react";

interface OrderProps {
  type: string;
}

const Order = ({ type }: OrderProps) => {
  const [orderType, setOrderType] = useState<string>("MARKET");
  console.log(orderType);

  return (
    <>
      <div className="container items-center">
        <Dialog>
          <DialogTrigger>
            <Button>{type} Order</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[40vw]">
            <DialogHeader>
              <DialogTitle>{type} Order</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Quantity</Label>
                <Input className="col-span-3" type="number" min="1" step="1" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Price</Label>
                {orderType === "MARKET" || orderType === "SL-M" ? (
                  <Input
                    className="col-span-3"
                    type="number"
                    min="0.0"
                    placeholder="Market"
                    disabled
                  />
                ) : (
                  <Input className="col-span-3" type="number" min="0.0" />
                )}
              </div>
              <Tabs
                defaultValue="MARKET"
                className="items-center "
                onValueChange={(value: string) => setOrderType(value)}
              >
                <TabsList className="grid w-[30vw] items-center grid-cols-4">
                  <TabsTrigger value="MARKET">Market</TabsTrigger>
                  <TabsTrigger value="LIMIT">Limit</TabsTrigger>
                  <TabsTrigger value="SL">SL</TabsTrigger>
                  <TabsTrigger value="SL-M">SL Mkt</TabsTrigger>
                </TabsList>
                <TabsContent value="MARKET">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Additional Settings</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label>Disclosed Quantity</Label>
                            <Input
                              className="col-span-3"
                              type="number"
                              min="0.0"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label>Validity</Label>
                            <Select>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Validity" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Validity</SelectLabel>
                                  <SelectItem value="DAY">Day</SelectItem>
                                  <SelectItem value="IOC">IOC</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>
                <TabsContent value="LIMIT">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Additional Settings</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label>Disclosed Quantity</Label>
                            <Input
                              className="col-span-3"
                              type="number"
                              min="0.0"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label>Validity</Label>
                            <Select>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Validity" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Validity</SelectLabel>
                                  <SelectItem value="DAY">Day</SelectItem>
                                  <SelectItem value="IOC">IOC</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>
                <TabsContent value="SL">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Trigger Price</Label>
                    <Input className="col-span-3" type="number" min="0.0" />
                  </div>
                  <p className="self-center relative top-[1vh] left-[10vw] text-[12px]">
                    Your order will be executed after a stock crosses this
                    trigger price set by you.
                  </p>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Additional Settings</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label>Disclosed Quantity</Label>
                            <Input
                              className="col-span-3"
                              type="number"
                              min="0.0"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label>Validity</Label>
                            <Select disabled>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Validity" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Validity</SelectLabel>
                                  <SelectItem value="DAY">Day</SelectItem>
                                  <SelectItem value="IOC">IOC</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>
                <TabsContent value="SL-M">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Trigger Price</Label>
                    <Input className="col-span-3" type="number" min="0.0" />
                  </div>
                  <p className="self-center relative top-[1vh] left-[10vw] text-[12px]">
                    Your order will be executed after a stock crosses this
                    trigger price set by you.
                  </p>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Additional Settings</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label>Disclosed Quantity</Label>
                            <Input
                              className="col-span-3"
                              type="number"
                              min="0.0"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label>Validity</Label>
                            <Select disabled>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Validity" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Validity</SelectLabel>
                                  <SelectItem value="DAY">Day</SelectItem>
                                  <SelectItem value="IOC">IOC</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>
              </Tabs>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Order;
