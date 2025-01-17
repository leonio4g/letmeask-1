
import { useHistory, useParams } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode'
import '../styles/room.scss';
import '../styles/room-code.scss';
//import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { Question } from '../components/Question/Question';
import { useRoom } from '../hooks/useRoom';
import deleteImg from '../assets/images/deleteImg.svg';

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  ishighLighted: boolean;
} >

type RoomParams = {
  id: string;
}
export function AdminRoom(){
  //const {user} = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const {title, questions} = useRoom(roomId);

  async function handleEndRoom(){
    database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/');
  }
  async function handleDeleteQuestion(questionId: string){
    if(window.confirm('Tem certeza que deseja excluir essa pergunta?')){
      const questionRef = await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return(
    <div id="page-room">
    <header>
      <div className="content">
        <img src={logoImg} alt="LetMeAsk" />
        <div>
        <RoomCode code= {roomId}/>
        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
        </div>
      </div>
    </header>

    <main>
      <div className="room-title">
        <h1>Sala {title}</h1>
        {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
      </div>
        <div className="question-list">
        {questions.map(question => {
          return(
            <Question 
              key = {question.id}
              content = {question.content}
              author = {question.author}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                  >
                  <img src={deleteImg} alt="Remover pergunta" />
                   </button>
              </Question>
          );
        })}
        </div>
    </main>
    </div>
  )
}