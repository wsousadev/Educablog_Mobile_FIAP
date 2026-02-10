import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostsAdminScreen from "../screens/Admin/PostsAdminScreen";
import PostCreateScreen from "../screens/Admin/PostCreateScreen";
import PostEditScreen from "../screens/Admin/PostEditScreen";

import TeachersListScreen from "../screens/Admin/TeachersListScreen";
import TeacherCreateScreen from "../screens/Admin/TeacherCreateScreen";
import TeacherEditScreen from "../screens/Admin/TeacherEditScreen";

import StudentsListScreen from "../screens/Admin/StudentsListScreen";
import StudentCreateScreen from "../screens/Admin/StudentCreateScreen";
import StudentEditScreen from "../screens/Admin/StudentEditScreen";


export type AdminStackParamList = {
  PostsAdmin: undefined;
  PostCreate: undefined;
  PostEdit: { id: number };

  TeachersList: undefined;
  TeacherCreate: undefined;
  TeacherEdit: { id: number };

  StudentsList: undefined;
  StudentCreate: undefined;
  StudentEdit: { id: number };
};

const Stack = createNativeStackNavigator<AdminStackParamList>();

export default function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PostsAdmin"
        component={PostsAdminScreen}
        options={{ title: "Administração" }}
      />
      <Stack.Screen name="PostCreate" component={PostCreateScreen} options={{ title: "Criar Post" }} />
      <Stack.Screen name="PostEdit" component={PostEditScreen} options={{ title: "Editar Post" }} />

      <Stack.Screen name="TeachersList" component={TeachersListScreen} options={{ title: "Professores" }} />
      <Stack.Screen name="TeacherCreate" component={TeacherCreateScreen} options={{ title: "Novo Professor" }} />
      <Stack.Screen name="TeacherEdit" component={TeacherEditScreen} options={{ title: "Editar Professor" }} />

      <Stack.Screen name="StudentsList" component={StudentsListScreen} options={{ title: "Alunos" }} />
      <Stack.Screen name="StudentCreate" component={StudentCreateScreen} options={{ title: "Novo Aluno" }} />
      <Stack.Screen name="StudentEdit" component={StudentEditScreen} options={{ title: "Editar Aluno" }} />
    </Stack.Navigator>
  );
}