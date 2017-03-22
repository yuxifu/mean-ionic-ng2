import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Todos } from '../../providers/todos';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  todos: any;
  loading: any;

  constructor(public navCtrl: NavController, public todoService: Todos, public modalCtrl: ModalController,
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController,
    public storage: Storage) {

  }

  ionViewDidLoad() {

    this.todoService.getTodos().then((data) => {
      this.todos = data;
    }, (err) => {
      console.log("not allowed");
    });

  }

  addTodo() {

    let prompt = this.alertCtrl.create({
      title: 'Add Todo',
      message: 'Describe your todo below:',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: todo => {

            if (todo) {

              this.showLoader('Adding new Todo...');

              this.todoService.createTodo(todo).then((result) => {
                this.loading.dismiss();
                this.todos = result;
                console.log("todo created");
              }, (err) => {
                this.loading.dismiss();
                console.log("not allowed");
              });

            }


          }
        }
      ]
    });

    prompt.present();

  }

  deleteTodo(todo) {

    this.showLoader('Deleting Todo...');

    //Remove from database
    this.todoService.deleteTodo(todo._id).then((result) => {

      this.loading.dismiss();

      //Remove locally
      let index = this.todos.indexOf(todo);

      if (index > -1) {
        this.todos.splice(index, 1);
      }

    }, (err) => {
      this.loading.dismiss();
      console.log("not allowed");
    });
  }

  showLoader(message: string) {

    this.loading = this.loadingCtrl.create({
      content: message
    });

    this.loading.present();

  }

  logout() {
    this.authService.logout().then(value => {
      this.navCtrl.setRoot(LoginPage);
    });
  }

}