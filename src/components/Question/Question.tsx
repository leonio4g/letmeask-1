import { ReactNode } from 'react';
import './style.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode;
  isAnswered?: boolean;
  ishighLighted?: boolean;
}

export function Question({content, author, isAnswered = false, ishighLighted = false, children}: QuestionProps){
  return (
    <div className= {`question ${isAnswered ? 'answered' : ''} ${ishighLighted && !isAnswered ? 'highLighted' : ''}`}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt= {author.name} />
          <span>{author.name}</span>
          </div>
          <div>{children}</div>
      </footer>
    </div>
  );
}