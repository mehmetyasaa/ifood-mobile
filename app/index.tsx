import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = 'onboarding.completed.v1';

export default function Index() {
    const [completed, setCompleted] = useState<boolean | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const v = await AsyncStorage.getItem(ONBOARDING_KEY);
                setCompleted(v === 'true');
            } catch {
                setCompleted(false);
            }
        })();
    }, []);

    if (completed === null) return null;

    return <Redirect href={completed ? '/(tabs)' : '/(onboarding)/welcome'} />;
}

export { ONBOARDING_KEY };