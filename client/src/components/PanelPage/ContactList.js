import React, { useState, useEffect, useRef } from 'react'
import st from 'styles/components/contact_list.module.css'
import copyIcon from 'assets/panel/table/copy_icon.svg'
import { usePush } from 'hooks'

export const ContactList = ({
  contactTitle = 'title',
  contacts,
  handleClick,
  copyContact,
  contactIcon = null,
}) => {
  const [opened, setOpened] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const mainRef = useRef()
  const push = usePush()

  const isShowContact = () => {
    setOpened((prev) => !prev)
    handleClick()
  }

  const handleCopy = (contactItem) => {
    copyClipboard(contactItem)
    copyContact(contactItem)
  }

  const copyClipboard = (contactItem) => {
    let textArea = document.createElement('textarea')
    textArea.value = contactItem
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('Copy')
    textArea.remove()
    push({ messages: 'Скопированно', ok: true })
  }

  useEffect(() => {
    setTimeout(() => setShowContent(opened), opened ? 210 : 0)
  }, [opened])

  const contactVariants = () => {
    return (
      <div
        className={st.language_variants}
        style={{ minHeight: opened ? (contacts.length * 50) : 0, maxWidth: 290 }}
      >
        {showContent && contacts.map((contact) => (
          <div
            key={contact}
            className={st.language_container_item}
          >
            <div className={st.language_name}>{contact}</div>
            <div
              className={st.copy_icon}
              onClickCapture={() => handleCopy(contact)}
              data-prompt-text-black='скопировать'
            >
              <img width={15} height={15} src={copyIcon} alt="phone-icon" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <div
        className={st.language_container + ' ' + st.language_container_wrapper}
        style={{
          borderBottomLeftRadius: opened ? 0 : 15,
          borderBottomRightRadius: opened ? 0 : 15,
        }}
        onClickCapture={() => isShowContact()}
        ref={mainRef}
      >
        {contactIcon ? <img src={contactIcon} alt="phone-icon" /> : ''}
        <div className={st.language_name}>{contactTitle}</div>
        <div className={st.arrow_container}>
          <div
            className={st.arrow}
            style={{
              transform: opened ? 'rotate(225deg)' : 'rotate(45deg)',
              marginBottom: opened ? 0 : 6,
            }}
          ></div>
        </div>
      </div>
      {contactVariants()}
    </>
  )
}
