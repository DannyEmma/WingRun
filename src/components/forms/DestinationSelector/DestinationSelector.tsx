import { Select } from 'radix-ui'
import styles from './DestinationSelector.module.css'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { DestinationsPerGroup } from '@/lib/types'

interface DestinationSelectorProps {
  defaultDestination: string
  destinationsPerGroup: DestinationsPerGroup
}

export default function DestinationSelector({ defaultDestination, destinationsPerGroup }: DestinationSelectorProps) {
  return (
    <div className={styles['destination-selector']}>
      <label>
        <p className={styles['country-label']}>
          Pays / Régions <sup>*</sup>
        </p>

        <Select.Root defaultValue={defaultDestination} name="destination" required>
          <Select.Trigger className={styles['select-trigger']} aria-label="Country">
            <Select.Value placeholder="Séléctionner" />
            <Select.Icon>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content position="popper" className={styles['select-content']}>
              <Select.ScrollUpButton>
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport>
                {destinationsPerGroup.map((row, index) => {
                  const [group, destinations] = row

                  return (
                    <Select.Group className={styles['select-group']} key={index}>
                      <Select.Label className={styles['select-label']}>{group}</Select.Label>

                      {destinations.map((d, index) => {
                        return (
                          <Select.Item className={styles['select-item']} key={index} value={JSON.stringify(d)}>
                            <Select.ItemText>{d.name}</Select.ItemText>
                            <Select.ItemIndicator className="SelectItemIndicator">
                              <CheckIcon />
                            </Select.ItemIndicator>
                          </Select.Item>
                        )
                      })}
                    </Select.Group>
                  )
                })}
              </Select.Viewport>
              <Select.ScrollDownButton>
                <ChevronDownIcon />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </label>
    </div>
  )
}
