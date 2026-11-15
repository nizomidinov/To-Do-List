import { useState } from 'react'
import './App.css';
function App() {
  const [inputText, setInputText] = useState("")
  const [tasks, setTasks] = useState([
    {
      name: "to walk",
      // editedName: '',
      isCrossed: false
    },

    {
      name: "to sleep",
      // editedName: '',
      isCrossed: false
    },

    {
      name: "to eat",
      // editedName: '',
      isCrossed: false
    }
  ])
  const [tabs, setTabs] = useState([])
  const [tabId, setTabId] = useState(0)
  const [isIndexCrossed, setIsIndexCrossed] = useState([])
  const [isIconSwitch, setIsIconSwitch] = useState([])
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
      editedName: ''
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

  // function clickForCross(index) {
  //   console.log("clickForCross")
  //   setTasks(prevTasks => {
  //     let nextTasks = [...prevTasks]
  //     let nextTask = nextTasks[index]
  //     let status = nextTask.isCrossed
  //     if (status) {
  //       nextTask.isCrossed = false
  //     }
  //     else {
  //       nextTask.isCrossed = true
  //     }
  //     // nextTask.isCrossed = nextTask.isCrossed ? false : true
  //     console.log(nextTasks)
  //     return nextTasks
  //   })
  // }
  function clickForCross(index) {
    setTasks(prevTasks =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, isCrossed: !task.isCrossed } : task //если индекс текущей задачи совпдает с индксом нажатой задачи то меням isCrossed на противоположный
      )
    )
  }

  function toggleEditMode(index) {
    if (isIconSwitch.includes(index)) {
      setIsIconSwitch(isIconSwitch.filter(i => i !== index))
      setTasks(prevTasks => {
        let nextTasks = [...prevTasks]
        let nextTask = nextTasks[index]
        nextTask.name = nextTask.editedName
        return nextTasks
      })
    }
    else {
      setTasks(prevTasks =>
        prevTasks.map((task, i) =>
          i === index ? { ...task, editedName: task.name } : task
        )
      )
      setIsIconSwitch([...isIconSwitch, index])
    }
  }

  function changeEditedName(text, i) {
    setTasks(prevTasks => {
      let nextTasks = [...prevTasks]
      let nextTask = nextTasks[i]
      nextTask.editedName = text
      return nextTasks
    })
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
                const isTaskCrossed = isIndexCrossed.includes(index);//проверяет есть ли в массиве isIndexCrossed индекс строки на которую нажали
                const iconSwitch = isIconSwitch.includes(index);

                return (
                  <li key={index}>
                    {
                      iconSwitch ?
                        <input type="text" id='editInput' value={t.editedName} onInput={(event) => changeEditedName(event.target.value, index)} /> :
                        <p onClick={() => clickForCross(index)}
                          style={{ textDecoration: t.isCrossed ? 'line-through' : 'none', cursor: 'default' }} //если есть то isTaskCrossed = true и срабатывает условие
                        >{index + 1}. {t.name}</p>
                    }
                    <div className='buttonsUl'>
                      <button type='button' onClick={() => toggleEditMode(index)}>
                        {iconSwitch ? '✅' : '🖊️'}</button>
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
