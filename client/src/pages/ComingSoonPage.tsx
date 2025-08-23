import { ArrowRightIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import emailjs from '@emailjs/browser';

export const ComingSoonPage = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const subscriptionMutation = useMutation({
    mutationFn: async (email: string) => {
      // Initialize Email.js with your public key
      emailjs.init('-muQ7r6gn-ZGEquip');
      
      // Prepare template parameters
      const templateParams = {
        user_email: email,
        timestamp: new Date().toLocaleString(),
        ip_address: 'Client-side submission',
        to_email: 'vora@ves.co.in'
      };

      // Send email using Email.js
      const result = await emailjs.send(
        'service_593zw4s',
        'template_6qbzf3c',
        templateParams
      );

      if (result.status !== 200) {
        throw new Error('Failed to send notification email');
      }

      return { success: true, message: 'Subscription successful!' };
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Thank you for subscribing! We'll notify you when we launch.",
      });
      setEmail("");
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    subscriptionMutation.mutate(email);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="bg-neutral-50 flex justify-center items-center w-full min-h-screen p-4 font-poppins">
      <div className="relative w-full max-w-[1440px] overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center px-0 sm:px-4 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8 lg:py-16 gap-4 sm:gap-6 lg:gap-8 min-h-[calc(100vh-2rem)] lg:min-h-[810px]">

          {/* Content Section */}
          <div className="flex flex-col w-full lg:max-w-[533px] space-y-6 sm:space-y-8 z-10 text-center lg:text-left">
            <div className="flex flex-col space-y-4 sm:space-y-6">
              <div className="flex flex-col space-y-2 sm:space-y-3">
                <p className="font-bold text-[#595959] text-sm sm:text-base lg:text-lg tracking-[0.18px] leading-6 sm:leading-8 lg:leading-9">
                  We’re almost ready to light up your world!
                </p>
                <h1 className="font-bold text-black 
                  text-[24px] sm:text-[30px] md:text-[38px] lg:text-[40px] xl:text-[44px] 
                  leading-tight whitespace-nowrap">
                  Vora Electric Service Pvt. Ltd.
                </h1>
                <p className="font-normal text-[#595959] text-sm sm:text-base lg:text-lg leading-6 sm:leading-7">
                  Vora has been delivering top-notch electrical and allied solutions for over six decades.
                  Our expertise has powered countless spaces.
                </p>
                <p className="font-normal text-[#595959] text-sm sm:text-base lg:text-lg leading-6 sm:leading-7">
                  Now, we’re switching on a new era with innovation, integrity, and legacy at the core.
                </p>
                <p className="font-bold text-black text-sm sm:text-base lg:text-lg leading-6 sm:leading-7">
                  Stay connected.<br />
                  Stay powered.<br />
                  Launching Soon!
                </p>
              </div>
            </div>

            {/* Email Subscription Section */}
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 lg:space-x-4 w-full max-w-md mx-auto lg:mx-0">
              <Card className="flex-grow w-full sm:w-auto rounded-full border border-[#bdbdbd] backdrop-blur-[2px] bg-transparent">
                <CardContent className="p-0">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="border-0 bg-transparent h-12 sm:h-14 px-4 sm:px-6 lg:px-8 text-[#999999] text-sm sm:text-base placeholder:text-xs sm:placeholder:text-sm"
                    placeholder="Enter your email for notifications"
                    required
                    disabled={subscriptionMutation.isPending}
                  />
                </CardContent>
              </Card>
              <Button
                onClick={handleSubmit}
                size="icon"
                className="w-12 h-12 sm:w-[56px] sm:h-[56px] lg:w-[60px] lg:h-[60px] rounded-full bg-[#ffc700] hover:bg-[#e6b400] text-black flex-shrink-0 transition-all duration-200"
                disabled={subscriptionMutation.isPending}
              >
                <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
              </Button>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative mt-4 sm:mt-6 lg:mt-0 w-full lg:w-auto flex justify-center lg:justify-end">
            <img
              className="w-full max-w-[250px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[600px] xl:w-[732px] h-auto object-cover"
              alt="Vora logo"
              src="/figmaAssets/vora.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
