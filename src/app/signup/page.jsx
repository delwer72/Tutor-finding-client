// "use client";
// import { FcGoogle } from "react-icons/fc";
// import { Card, Separator } from "@heroui/react";

// import {
//   Button,
//   Description,
//   FieldError,
//   Form,
//   Input,
//   Label,
//   TextField,
// } from "@heroui/react";
// import { authClient } from "@/lib/auth-client";
// import { redirect } from "next/navigation";

// const SignUpPage = () => {
//   const onSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);
//     const user = Object.fromEntries(formData.entries());

//     const { data, error } = await authClient.signUp.email({
//       email: user.email,
//       password: user.password,
//       name: user.name,
//       image: user.image,
//     });

//     if (data) {
//       redirect("/");
//     }

//     if (error) {
//       // toast
//       alert("Error");
//     }
//   };

//   const handleGoogleSignin = async() => {
//     await authClient.signIn.social({
//         provider: "google"
//     })

//   }

//   return (
//     <div className="max-w-7xl mx-auto">
//       <div className="text-center my-3">
//         <h1 className="text-2xl font-bold">Create Account</h1>
//         <p>Start your adventure with Wanderlust</p>
//       </div>
//       <Card className="border rounded-none">
//         <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4">
//           <TextField isRequired name="name" type="text">
//             <Label>Name</Label>
//             <Input placeholder="Enter your name" />
//             <FieldError />
//           </TextField>

//           <TextField name="image" type="url">
//             <Label>Image URL</Label>
//             <Input placeholder="Image url" />
//             <FieldError />
//           </TextField>

//           <TextField
//             isRequired
//             name="email"
//             type="email"
//             validate={(value) => {
//               if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
//                 return "Please enter a valid email address";
//               }
//               return null;
//             }}
//           >
//             <Label>Email</Label>
//             <Input placeholder="john@example.com" />
//             <FieldError />
//           </TextField>
//           <TextField
//             isRequired
//             minLength={8}
//             name="password"
//             type="password"
//             validate={(value) => {
//               if (value.length < 8) {
//                 return "Password must be at least 8 characters";
//               }
//               if (!/[A-Z]/.test(value)) {
//                 return "Password must contain at least one uppercase letter";
//               }
//               if (!/[0-9]/.test(value)) {
//                 return "Password must contain at least one number";
//               }
//               return null;
//             }}
//           >
//             <Label>Password</Label>
//             <Input placeholder="Enter your password" />
//             <Description>
//               Must be at least 8 characters with 1 uppercase and 1 number
//             </Description>
//             <FieldError />
//           </TextField>
//           <div className="flex justify-center gap-2">
//             <Button className={"rounded-none w-full bg-cyan-500"} type="submit">
//               Create Account
//             </Button>
//           </div>
//         </Form>
//         <div className="flex justify-center items-center gap-3">
//             <Separator/>
//            <div className="whitespace-nowrap"> Or sign up with </div>
//               <Separator/>
//             </div>
//         <div>
//             <Button onClick={handleGoogleSignin} variant="outline" className={'w-full rounded-none'}><FcGoogle /> Sign in with Google</Button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default SignUpPage;


"use client";

import { FcGoogle } from "react-icons/fc";
import { Card, Separator } from "@heroui/react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signUp.email({
        email: user.email,
        password: user.password,
        name: user.name,
        image: user.image || "",
      });

      if (error) {
        alert(error.message || "Signup failed");
        return;
      }

      if (data) {
        // optional: small delay for better UX
        setTimeout(() => {
          router.push("/login");
        }, 300);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (err) {
      console.error(err);
      alert("Google sign in failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center my-3">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p>
          Find the right tutor, start learning smarter with Tutor Finder
        </p>
      </div>

      <Card className="border rounded-none p-4">
        <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4">

          {/* Name */}
          <TextField isRequired name="name" type="text">
            <Label>Name</Label>
            <Input placeholder="Enter your name" />
            <FieldError />
          </TextField>

          {/* Photo URL */}
          <TextField name="image" type="url">
            <Label>Photo URL</Label>
            <Input placeholder="Photo URL (optional)" />
            <FieldError />
          </TextField>

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 6) {
                return "Minimum 6 characters required";
              }
              if (!/[A-Z]/.test(value)) {
                return "Must contain 1 uppercase letter";
              }
              if (!/[a-z]/.test(value)) {
                return "Must contain 1 lowercase letter";
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter password" />
            <Description>
              6+ chars, 1 uppercase, 1 lowercase
            </Description>
            <FieldError />
          </TextField>

          <Button
            className="rounded-none w-full bg-cyan-500"
            type="submit"
          >
            Create Account
          </Button>
        </Form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <Separator />
          <div className="whitespace-nowrap">Or sign up with</div>
          <Separator />
        </div>

        {/* Google */}
        <Button
          onClick={handleGoogleSignin}
          variant="outline"
          className="w-full rounded-none"
        >
          <FcGoogle /> Sign in with Google
        </Button>
      </Card>
    </div>
  );
};

export default SignUpPage;