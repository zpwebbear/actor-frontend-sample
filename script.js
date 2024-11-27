import { ActorSystem } from './engine.js';
import { TodoListLoader } from './actors/TodoListLoader.js';
import { TodoFeature } from './actors/TodoFeature.js';
import { Notifier } from './actors/Notifier.js';
import { ButtonWidget } from './actors/ButtonWidget.js';
import { TodoListWidget } from './actors/TodoListWidget.js';

ActorSystem.register(ButtonWidget);
ActorSystem.register(TodoListLoader);
ActorSystem.register(TodoListWidget);
ActorSystem.register(Notifier);
ActorSystem.register(TodoFeature);
ActorSystem.start('TodoFeature');
