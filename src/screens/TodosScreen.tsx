import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';

import { useMyTodos, useRecommendTodo } from '@/apis/todo/todos';
import Text from '@/components/design/Text';
import TodoItem from '@/components/TodoItem';
import { NavigationProp } from '@/navigations/StackNavigator';

const TodosScreen = () => {
  const navigation = useNavigation<NavigationProp<'MainTabs'>>();

  const { data: todoList } = useMyTodos();
  const { data: recommendTodoList } = useRecommendTodo();

  console.log(
    'recommendTodoList',
    recommendTodoList?.map(todo => ({
      title: todo.title,
      recommendReasons: todo.recommendReasons,
    })),
  );

  return (
    <Container>
      {todoList?.map(todo => (
        <TodoItem
          key={todo.id}
          myTodoNode={todo}
          onPress={() => {
            navigation.push('Todo', { id: todo.id });
          }}
        />
      ))}

      <Text>추천</Text>

      {recommendTodoList?.map(todo => (
        <TodoItem
          key={todo.id}
          myTodoNode={todo}
          onPress={() => {
            navigation.push('Todo', { id: todo.id });
          }}
        />
      ))}
      <Text />
    </Container>
  );
};

const Container = styled(ScrollView)`
  flex: 1;
  padding-top: 16px;
`;

export default TodosScreen;
