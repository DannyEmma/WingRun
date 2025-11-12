'use client'

import styles from './SizeGuide.module.css'
import { useState } from 'react'
import { Tabs } from 'radix-ui'
import { Dialog } from 'radix-ui'

type Category = 'homme' | 'femme' | 'enfant'

export default function SizeGuide({ trigger }: { trigger: React.JSX.Element }) {
  const [category, setCategory] = useState<Category>('homme')
  const tabsToCategory: Record<string, Category> = { tab1: 'homme', tab2: 'femme', tab3: 'enfant' }

  const handleTabsChange = (currentTab: string) => setCategory(tabsToCategory[currentTab])

  return (
    <div className={styles['size-guide']}>
      <Dialog.Root>
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={styles['modal-overlay']} />
          <Dialog.Content className={styles['modal-content']}>
            <Dialog.Title className={styles['modal-title']}>Guide des tailles sneakers pour {category}</Dialog.Title>

            <Tabs.Root onValueChange={handleTabsChange} className={styles['tabs-root']} defaultValue="tab1" orientation="vertical">
              <Tabs.List className={styles['tabs-list']}>
                <Tabs.Trigger className={styles['tabs-trigger']} value="tab1">
                  Homme
                </Tabs.Trigger>
                <Tabs.Trigger className={styles['tabs-trigger']} value="tab2">
                  Femme
                </Tabs.Trigger>
                <Tabs.Trigger className={styles['tabs-trigger']} value="tab3">
                  Enfant
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content className={styles['tabs-content']} value="tab1">
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Taille EU</th>
                      <th>Taille UK</th>
                      <th>Taille US</th>
                      <th>Longueur pied (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>39</td>
                      <td>6</td>
                      <td>6.5</td>
                      <td>24.5</td>
                    </tr>
                    <tr>
                      <td>39.5</td>
                      <td>6.5</td>
                      <td>7</td>
                      <td>25.0</td>
                    </tr>
                    <tr>
                      <td>40</td>
                      <td>7</td>
                      <td>7.5</td>
                      <td>25.5</td>
                    </tr>
                    <tr>
                      <td>40.5</td>
                      <td>7.5</td>
                      <td>8</td>
                      <td>26.0</td>
                    </tr>
                    <tr>
                      <td>41</td>
                      <td>8</td>
                      <td>8.5</td>
                      <td>26.5</td>
                    </tr>
                    <tr>
                      <td>41.5</td>
                      <td>8.5</td>
                      <td>9</td>
                      <td>27.0</td>
                    </tr>
                    <tr>
                      <td>42</td>
                      <td>9</td>
                      <td>9.5</td>
                      <td>27.5</td>
                    </tr>
                    <tr>
                      <td>42.5</td>
                      <td>9.5</td>
                      <td>10</td>
                      <td>28.0</td>
                    </tr>
                    <tr>
                      <td>43</td>
                      <td>10</td>
                      <td>10.5</td>
                      <td>28.5</td>
                    </tr>
                    <tr>
                      <td>43.5</td>
                      <td>10.5</td>
                      <td>11</td>
                      <td>29.0</td>
                    </tr>
                    <tr>
                      <td>44</td>
                      <td>11</td>
                      <td>11.5</td>
                      <td>29.5</td>
                    </tr>
                    <tr>
                      <td>44.5</td>
                      <td>11.5</td>
                      <td>12</td>
                      <td>30.0</td>
                    </tr>
                    <tr>
                      <td>45</td>
                      <td>12</td>
                      <td>12.5</td>
                      <td>30.5</td>
                    </tr>
                    <tr>
                      <td>45.5</td>
                      <td>12.5</td>
                      <td>13</td>
                      <td>31.0</td>
                    </tr>
                    <tr>
                      <td>46</td>
                      <td>13</td>
                      <td>13.5</td>
                      <td>31.5</td>
                    </tr>
                    <tr>
                      <td>46.5</td>
                      <td>13.5</td>
                      <td>14</td>
                      <td>32.0</td>
                    </tr>
                    <tr>
                      <td>47</td>
                      <td>14</td>
                      <td>14.5</td>
                      <td>32.5</td>
                    </tr>
                    <tr>
                      <td>47.5</td>
                      <td>14.5</td>
                      <td>15</td>
                      <td>33.0</td>
                    </tr>
                    <tr>
                      <td>48</td>
                      <td>15</td>
                      <td>15.5</td>
                      <td>33.5</td>
                    </tr>
                  </tbody>
                </table>
              </Tabs.Content>
              <Tabs.Content className={styles['tabs-content']} value="tab2">
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Taille EU</th>
                      <th>Taille UK</th>
                      <th>Taille US</th>
                      <th>Longueur pied (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>35</td>
                      <td>2.5</td>
                      <td>5</td>
                      <td>22.5</td>
                    </tr>
                    <tr>
                      <td>35.5</td>
                      <td>3</td>
                      <td>5.5</td>
                      <td>23.0</td>
                    </tr>
                    <tr>
                      <td>36</td>
                      <td>3.5</td>
                      <td>6</td>
                      <td>23.5</td>
                    </tr>
                    <tr>
                      <td>36.5</td>
                      <td>4</td>
                      <td>6.5</td>
                      <td>24.0</td>
                    </tr>
                    <tr>
                      <td>37</td>
                      <td>4.5</td>
                      <td>7</td>
                      <td>24.5</td>
                    </tr>
                    <tr>
                      <td>37.5</td>
                      <td>5</td>
                      <td>7.5</td>
                      <td>25.0</td>
                    </tr>
                    <tr>
                      <td>38</td>
                      <td>5.5</td>
                      <td>8</td>
                      <td>25.5</td>
                    </tr>
                    <tr>
                      <td>38.5</td>
                      <td>6</td>
                      <td>8.5</td>
                      <td>26.0</td>
                    </tr>
                    <tr>
                      <td>39</td>
                      <td>6.5</td>
                      <td>9</td>
                      <td>26.5</td>
                    </tr>
                    <tr>
                      <td>39.5</td>
                      <td>7</td>
                      <td>9.5</td>
                      <td>27.0</td>
                    </tr>
                    <tr>
                      <td>40</td>
                      <td>7.5</td>
                      <td>10</td>
                      <td>27.5</td>
                    </tr>
                    <tr>
                      <td>40.5</td>
                      <td>8</td>
                      <td>10.5</td>
                      <td>28.0</td>
                    </tr>
                    <tr>
                      <td>41</td>
                      <td>8.5</td>
                      <td>11</td>
                      <td>28.5</td>
                    </tr>
                    <tr>
                      <td>41.5</td>
                      <td>9</td>
                      <td>11.5</td>
                      <td>29.0</td>
                    </tr>
                    <tr>
                      <td>42</td>
                      <td>9.5</td>
                      <td>12</td>
                      <td>29.5</td>
                    </tr>
                    <tr>
                      <td>42.5</td>
                      <td>10</td>
                      <td>12.5</td>
                      <td>30.0</td>
                    </tr>
                    <tr>
                      <td>43</td>
                      <td>10.5</td>
                      <td>13</td>
                      <td>30.5</td>
                    </tr>
                  </tbody>
                </table>
              </Tabs.Content>
              <Tabs.Content className={styles['tabs-content']} value="tab3">
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Taille EU</th>
                      <th>Taille UK</th>
                      <th>Taille US</th>
                      <th>Longueur pied (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>19</td>
                      <td>2</td>
                      <td>3</td>
                      <td>11.5</td>
                    </tr>
                    <tr>
                      <td>20</td>
                      <td>2.5</td>
                      <td>3.5</td>
                      <td>12.0</td>
                    </tr>
                    <tr>
                      <td>21</td>
                      <td>3</td>
                      <td>4</td>
                      <td>12.5</td>
                    </tr>
                    <tr>
                      <td>22</td>
                      <td>4</td>
                      <td>5</td>
                      <td>13.0</td>
                    </tr>
                    <tr>
                      <td>23</td>
                      <td>5</td>
                      <td>6</td>
                      <td>13.5</td>
                    </tr>
                    <tr>
                      <td>24</td>
                      <td>5.5</td>
                      <td>6.5</td>
                      <td>14.0</td>
                    </tr>
                    <tr>
                      <td>25</td>
                      <td>6</td>
                      <td>7</td>
                      <td>14.5</td>
                    </tr>
                    <tr>
                      <td>26</td>
                      <td>6.5</td>
                      <td>7.5</td>
                      <td>15.0</td>
                    </tr>
                    <tr>
                      <td>27</td>
                      <td>7</td>
                      <td>8</td>
                      <td>15.5</td>
                    </tr>
                    <tr>
                      <td>28</td>
                      <td>8</td>
                      <td>9</td>
                      <td>16.0</td>
                    </tr>
                    <tr>
                      <td>29</td>
                      <td>9</td>
                      <td>10</td>
                      <td>16.5</td>
                    </tr>
                    <tr>
                      <td>30</td>
                      <td>9.5</td>
                      <td>10.5</td>
                      <td>17.0</td>
                    </tr>
                    <tr>
                      <td>31</td>
                      <td>10</td>
                      <td>11</td>
                      <td>17.5</td>
                    </tr>
                    <tr>
                      <td>32</td>
                      <td>11</td>
                      <td>12</td>
                      <td>18.0</td>
                    </tr>
                    <tr>
                      <td>33</td>
                      <td>11.5</td>
                      <td>12.5</td>
                      <td>18.5</td>
                    </tr>
                    <tr>
                      <td>34</td>
                      <td>12</td>
                      <td>13</td>
                      <td>19.0</td>
                    </tr>
                    <tr>
                      <td>35</td>
                      <td>1</td>
                      <td>1.5</td>
                      <td>19.5</td>
                    </tr>
                    <tr>
                      <td>36</td>
                      <td>2</td>
                      <td>2.5</td>
                      <td>20.0</td>
                    </tr>
                    <tr>
                      <td>37</td>
                      <td>3</td>
                      <td>3.5</td>
                      <td>21.0</td>
                    </tr>
                    <tr>
                      <td>38</td>
                      <td>4</td>
                      <td>4.5</td>
                      <td>22.0</td>
                    </tr>
                  </tbody>
                </table>
              </Tabs.Content>
            </Tabs.Root>

            <Dialog.Close className={styles['modal-close']}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L13 13M13 1L1 13" stroke="#514E49" strokeWidth="1.33333" strokeLinecap="round" />
              </svg>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
