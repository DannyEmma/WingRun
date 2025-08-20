'use client'

import styles from './Form.module.css'
import { Select } from 'radix-ui'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'

export default function Adresse() {
  const handleSubmit = () => {}
  return (
    <form onSubmit={handleSubmit}>
      {/* ----- First Name ----- */}
      <div className={styles['input-container']}>
        <label htmlFor="firstname">
          prénom <sup>*</sup>
        </label>
        <input id="firstname" type="text" name="firstname" required />
      </div>

      {/* ----- Last Name ----- */}
      <div className={styles['input-container']}>
        <label htmlFor="lastname">
          nom <sup>*</sup>
        </label>
        <input id="lastname" type="text" name="lastname" required />
      </div>

      {/* ----- Country / Region ----- */}

      {/* ----- Adresse ----- */}
      <div className={styles['input-container']}>
        <label htmlFor="adresse">
          Adresse <sup>*</sup>
        </label>
        <input id="adresse" type="text" name="adresse" required />
      </div>

      {/* ----- Adresse 2 ---- */}
      <div className={styles['input-container']}>
        <label htmlFor="adresse2">Complément d'adresse</label>
        <input id="adresse2" type="text" name="adresse2" />
      </div>

      <div>
        {/* ----- City ----- */}
        <div className={styles['input-container']}>
          <label htmlFor="city">
            ville <sup>*</sup>
          </label>
          <input id="city" type="text" name="city" required />
        </div>

        {/* ----- Code postal ----- */}
        <div className={styles['input-container']}>
          <label htmlFor="cp">
            code postal <sup>*</sup>
          </label>
          <input id="cp" type="text" name="cp" required />
        </div>
      </div>

      {/* ----- Phone ----- */}
      <div className={styles['input-container']}>
        <label htmlFor="phone">
          phone <sup>*</sup>
        </label>
        <input id="phone" type="text" name="phone" required />
      </div>

      {/* ----- Default ----- */}
      <div>
        <label>
          <input type="checkbox" />
          Définir comme adresse par défaut
        </label>
      </div>
      <button type="submit">Envoyer</button>
    </form>
  )
}

// <Select.Root>
//       <Select.Trigger className="SelectTrigger" aria-label="Food">
//         <Select.Value placeholder="Select a fruit…" />
//         <Select.Icon className="SelectIcon">
//           <ChevronDownIcon />
//         </Select.Icon>
//       </Select.Trigger>
//       <Select.Portal>
//         <Select.Content className="SelectContent">
//           <Select.ScrollUpButton className="SelectScrollButton">
//             <ChevronUpIcon />
//           </Select.ScrollUpButton>
//           <Select.Viewport>
//             <Select.Group>
//               <Select.Label>Europe</Select.Label>
//               <Select.Item value="apple">Apple</Select.Item>
//             </Select.Group>

//             <Select.Separator />

//             <Select.Group>
//               <Select.Label>France - DOM-TOM</Select.Label>
//               <Select.Item value="aubergine">Aubergine</Select.Item>
//             </Select.Group>
//           </Select.Viewport>
//           <Select.ScrollDownButton>
//             <ChevronDownIcon />
//           </Select.ScrollDownButton>
//         </Select.Content>
//       </Select.Portal>
//     </Select.Root>
