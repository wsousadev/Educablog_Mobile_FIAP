import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";

import PostsAdminScreen from "../screens/Admin/PostsAdminScreen";
import PostCreateScreen from "../screens/Admin/PostCreateScreen";
import PostEditScreen from "../screens/Admin/PostEditScreen";

import TeachersListScreen from "../screens/Admin/TeachersListScreen";
import TeacherCreateScreen from "../screens/Admin/TeacherCreateScreen";
import TeacherEditScreen from "../screens/Admin/TeacherEditScreen";

import StudentsListScreen from "../screens/Admin/StudentsListScreen";
import StudentCreateScreen from "../screens/Admin/StudentCreateScreen";
import StudentEditScreen from "../screens/Admin/StudentEditScreen";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function AdminPostsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PostsAdmin"
        component={PostsAdminScreen}
        options={{ title: "Postagens" }}
      />
      <Stack.Screen
        name="PostCreate"
        component={PostCreateScreen}
        options={{ title: "Criar post" }}
      />
      <Stack.Screen
        name="PostEdit"
        component={PostEditScreen}
        options={{ title: "Editar post" }}
      />
    </Stack.Navigator>
  );
}

function TeachersStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TeachersList"
        component={TeachersListScreen}
        options={{ title: "Professores" }}
      />
      <Stack.Screen
        name="TeacherCreate"
        component={TeacherCreateScreen}
        options={{ title: "Novo professor" }}
      />
      <Stack.Screen
        name="TeacherEdit"
        component={TeacherEditScreen}
        options={{ title: "Editar professor" }}
      />
    </Stack.Navigator>
  );
}

function StudentsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StudentsList"
        component={StudentsListScreen}
        options={{ title: "Alunos" }}
      />
      <Stack.Screen
        name="StudentCreate"
        component={StudentCreateScreen}
        options={{ title: "Novo aluno" }}
      />
      <Stack.Screen
        name="StudentEdit"
        component={StudentEditScreen}
        options={{ title: "Editar aluno" }}
      />
    </Stack.Navigator>
  );
}

export default function AdminDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: "Administração",
        drawerActiveTintColor: "#7a1e2b",
        drawerInactiveTintColor: "#444",
      }}
    >
      <Drawer.Screen
        name="AdminPosts"
        component={AdminPostsStack}
        options={{
          title: "Posts",
          drawerIcon: ({ color, size }) => (
            <Feather name="file-text" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="AdminTeachers"
        component={TeachersStack}
        options={{
          title: "Professores",
          drawerIcon: ({ color, size }) => (
            <Feather name="users" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="AdminStudents"
        component={StudentsStack}
        options={{
          title: "Alunos",
          drawerIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
