"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { motion } from "motion/react";
import { createClient } from "../lib/supabase/client";

export const UserProfile = ({
  className = "",
}: React.HTMLAttributes<HTMLDivElement>) => {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.push("/auth/login");
      } else {
        setUser(data.user);
      }
    };

    getUser();
  }, [supabase, router]);

  if (!user) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-start gap-2 group/sidebar py-1.5",
        className
      )}
    >
      <Avatar>
        <AvatarImage src={user.user_metadata?.avatar_url} />
        <AvatarFallback>{user.email?.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <motion.span className="text-neutral-700 dark:text-neutral-200 text-base group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block sp-0 m-0 ml-2">
        {user.user_metadata?.full_name}
      </motion.span>
    </div>
  );
};
