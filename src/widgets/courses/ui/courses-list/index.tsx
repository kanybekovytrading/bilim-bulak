"use client";
import { useGetCourses } from "@/entities/user/courses/model/api/queries";

export const CoursesList = () => {
  const { data: courses } = useGetCourses();

  console.log(courses);

  return <section>CoursesList</section>;
};
