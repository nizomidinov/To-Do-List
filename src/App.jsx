import { useState } from 'react'
import './App.css';
function App() {
  const [inputText, setInputText] = useState("")
  const [tasks, setTasks] = useState([
    {
      name: "to walk",
      editedName: '',
      isCrossed: false,
      isBeingEdited: false
    },

    {
      name: "to sleep",
      editedName: '',
      isCrossed: false,
      isBeingEdited: false
    },

    {
      name: "to eat",
      editedName: '',
      isCrossed: false,
      isBeingEdited: false
    }
  ])
  const [tabs, setTabs] = useState([])
  const [tabId, setTabId] = useState(0)
  const [activeTab, setActiveTab] = useState(0)

  function addTab() {
    setTabs(prevTabs => {
      let newTab = {
        id: tabId,
        text: "New Tab"
      };
      return [...prevTabs, newTab]
    })
    setTabId(tId => tId + 1)
  }

  function addTask() {
    if (inputText == "") return;
    let newTask = {
      name: inputText,
      editedName: '',
      isCrossed: false,
      isBeingEdited: false
    }
    setInputText("")
    setTasks(prevTasks => {
      let nextTasks = [...prevTasks, newTask]
      console.log(nextTasks)
      return nextTasks
    })
  }

  function removeTask(index) {
    setTasks(prevTasks => {
      let nextTasks = [...prevTasks]
      nextTasks.splice(index, 1)
      return nextTasks
    })
  }

  function removeTab(RemoveId, event) {
    event.stopPropagation() //останавливает распространение, чтобы нажатие действовало только на  <span>&times</span>
    setTabs(prevTabs => prevTabs.filter(tab => tab.id !== RemoveId))
    setActiveTab(RemoveId - 1)
  }

  function clickForCross(index) {
    setTasks(prevTasks =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, isCrossed: !task.isCrossed } : task //если индекс текущей задачи совпдает с индксом нажатой задачи то меням isCrossed на противоположный
      )
    )
  }

  function changeTaskName(text, index) {
    setTasks(prevTasks =>
      prevTasks.map((task, i) => i === index ? { ...task, name: text } : task
      )
    )
  }

  function editTask(index) {
    setTasks(prevTasks =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, isBeingEdited: !task.isBeingEdited } : task
      )
    )
  }

  return (
    <>
      <form action="">
        <div className='cont'>
          <h1>ToDo App {tasks.length}</h1>
          <div className="firstButtons">
            <button className="tab-b" type='button' onClick={addTab}>+Tab</button>
            {
              tabs.map((tab, index) => (
                <button key={index} className="tabAll" id={tab.id == activeTab ? 'active' : ''} onClick={() => setActiveTab(tab.id)} type='button'>{tab.text}
                  <span className='cross' onClick={(event) => removeTab(tab.id, event)}>
                    &times;
                  </span>
                </button>
              ))
            }
          </div>
          <ul>
            {
              tasks.map((t, index) => {
                return (
                  <li key={index}>
                    {
                      t.isBeingEdited ?
                        <input type="text" id='editInput' value={t.name} onChange={(event) => changeTaskName(event.target.value, index)} />
                        :
                        <p onClick={() => clickForCross(index)}
                          style={{ textDecoration: t.isCrossed ? 'line-through' : 'none', cursor: 'default' }} //если есть то isTaskCrossed = true и срабатывает условие
                        >{index + 1}. {t.name}</p>
                    }
                    <div className='buttonsUl'>
                      <button type='button' onClick={() => editTask(index)}>
                        {t.isBeingEdited ? '✅' : '🖊️'}</button>
                      <button type='button' onClick={() => removeTask(index)}>🗑️</button>
                    </div>
                  </li>
                )
              })
            }
          </ul>
          <div className='inputButtons'>
            <input type="text" value={inputText} onInput={(event) => setInputText(event.target.value)} />
            <button className='lastButtons' type='button' onClick={() => addTask()}>📌</button>
            <button className='lastButtons' type='button' onClick={() => setTasks([])}>💣</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default App
